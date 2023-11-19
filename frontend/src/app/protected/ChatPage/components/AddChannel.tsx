"use client";
import { Button, DialogActions } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { Avatar, Box, Flex, ScrollArea, Text } from "@radix-ui/themes";
import * as React from "react";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import {
  IoAddOutline,
  IoCloseOutline,
  IoPersonAdd,
  IoPersonRemove,
} from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { z } from "zod";
import { useGlobalContext } from "../../context/store";
import { createChannel } from "../api/fetch-channel";
import { getValideUsers, getVueGeust } from "../api/fetch-users";
import { getColorStatus } from "./ListUser";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

enum ChannelType {
  Public = "Public",
  Private = "Private",
}
export default function AlertAddChannel() {
  const [open, setOpen] = React.useState(false);

  const channelNameSchema = z
    .string()
    .min(3)
    .max(50)
    .refine((name) => /^[a-zA-Z0-9_-]+$/.test(name));
  const channelkeySchema = z
    .string()
    .min(3)
    .max(50)
    .refine((name) => /^[a-zA-Z0-9_\-@#*!.]+$/.test(name));

  const [errorName, setErrorName] = useState("");
  const [errorKey, setErrorKey] = useState("");

  const [channelData, setChannelData] = useState<channelDto>({
    channelName: "",
    channelType: ChannelType.Public,
    channelPassword: "",
    channelOwnerId: "",
    avatar: "",
    protected: false,
    channelMember: [],
  });

  const [isReady, setIsReady] = useState(false);

  const [memberSearch, setMemberSearch] = useState("");

  const { user, setGeust, socket, setOpenAlertError } = useGlobalContext();
  const [valideUsers, setValideUsers] = useState<userDto[]>([]);
  const [usersFilter, setUsersFilter] = useState<userDto[]>([]);
  const [membersChannel, setMembersChannel] = useState<userDto[]>([]);

  useEffect(() => {
    async function getData() {
      if (user.id !== "-1") {
        const temp = await getValideUsers(user.id);
        if (temp !== undefined) setValideUsers(temp);
        else setOpenAlertError(true);
      }
    }
    getData();
  }, [open, user.id]);

  useEffect(() => {
    const tmp: userDto[] = valideUsers.filter((elm) => {
      const username = elm.nickname;
      return (
        (username.includes(memberSearch) && memberSearch != "") ||
        memberSearch === "*"
      );
    });
    if (valideUsers.length) setUsersFilter(tmp);
  }, [memberSearch, valideUsers]);

  const getDataGeust = async (id: string, isUser: Boolean) => {
    const temp = await getVueGeust(id, isUser);
    if (temp !== undefined) setGeust(temp);
    else setOpenAlertError(true);
  };
  useEffect(() => {
    async function createCha() {
      if (isReady) {
        const res = await createChannel(channelData, user.id);
        if (res !== undefined) {
          if (res.status === 200) {
            getDataGeust(res.id, false);
            socket?.emit("updateData", {
              content: "",
              senderId: user.id,
              isDirectMessage: false,
              receivedId: res.id,
            });
            setOpen(false);
          } else if (res.status === 202) {
            setErrorName(res.error);
          }
        } else setOpenAlertError(true);
      }
    }
    createCha();
    return () => setIsReady(false);
  }, [isReady]);

  useEffect(() => {
    setChannelData({
      channelName: "",
      channelType: ChannelType.Public,
      channelPassword: "",
      channelMember: [],
      channelOwnerId: "",
      protected: false,
      avatar: "",
    });
    setIsReady(false);
    setMemberSearch("");
    setUsersFilter([]);
    setMembersChannel([]);
  }, [open]);

  const checkIsExist = (elm: userDto, list: userDto[]): boolean => {
    const fonud = list.find((tmp) => elm.id === tmp.id);
    if (fonud) return true;
    return false;
  };

  const widgetSearsh = usersFilter.map((elm) => {
    return (
      <Box p="1" pr="3" className="mx-2" key={elm.id}>
        <Flex align="center" justify="between" className="border-b py-2">
          <div className="flex items-center relative">
            {/* <Avatar className="h-[30px] md:h-40 rounded-full"
                        src={elm.profilePic}
                        fallback="T"
                    style={{ height: '30px', borderRadius: '30px' }}
                    /> */}
            <img
              className="h-[20px] md:h-[30px]  rounded-full"
              src={elm.profilePic}
            />
            <Text weight="bold" className="pl-2 text-sm md:text-base">
              {elm.nickname}
            </Text>
          </div>
          {checkIsExist(elm, membersChannel) ? (
            <IoPersonRemove
              color="red"
              className="text-sm md:text-base"
              onClick={() => {
                setMembersChannel((prevMembers) =>
                  prevMembers.filter((member) => member.id !== elm.id)
                );
              }}
            />
          ) : (
            <IoPersonAdd
              color="green"
              className="text-sm md:text-base"
              onClick={() => {
                setMembersChannel((pre) => [...pre, elm]);
              }}
            />
          )}
        </Flex>
      </Box>
    );
  });

  const [isMouseOver, setIsMouseOver] = useState("-1");

  const [isPasswordVisibleAlert, setIsPasswordVisibleAlert] = useState(false);

  let styles: string =
    "px-2 md:px-8 py-1 my-1.5 rounded-[36px] text-[#254BD6] bg-white shadow-md";
  return (
    <div>
      <div
        className="flex items-center justify-center w-[50px] h-[40px] 
                rounded-[16px] bg-[#254BD6] cursor-pointer
                "
        onClick={() => setOpen(true)}
      >
        <IoAddOutline size={20} color="white" />
      </div>

      <Dialog open={open} keepMounted>
        <div className="flex justify-end mt-2 mr-2 cursor-pointer">
          <IoCloseOutline onClick={() => setOpen(false)} size="25" />
        </div>
        <DialogTitle style={{ padding: 0, paddingLeft: 15 }} textAlign="start">
          {"Create Channel"}
        </DialogTitle>
        <DialogContent
          style={{ padding: 0, paddingLeft: 15, paddingRight: 40 }}
          className=" h-[30rem]  w-[15rem] md:w-[25rem]   flex flex-col justify-center items-center "
        >
          <div className="pt-5">
            <div className="flex items-center justify-around bg-[#F6F7FA] rounded-[10px] border w-[10rem] md:w-[15rem]">
              <div
                style={{ cursor: "pointer" }}
                className={
                  channelData.channelType === ChannelType.Public ? styles : ""
                }
                onClick={() => {
                  setChannelData((prevState) => {
                    return { ...prevState, channelType: ChannelType.Public };
                  });
                }}
              >
                <Text size="2" weight="bold">
                  Public
                </Text>
              </div>
              <div
                style={{ cursor: "pointer" }}
                className={
                  channelData.channelType === ChannelType.Private ? styles : ""
                }
                onClick={() => {
                  setChannelData((prevState) => {
                    return { ...prevState, channelType: ChannelType.Private };
                  });
                }}
              >
                <Text size="2" weight="bold">
                  Private
                </Text>
              </div>
            </div>
            <div className="flex bg-[#F6F7FA] mt-3  border rounded-[10px]  w-[10rem] md:w-[15rem]">
              <input
                type={"text"}
                className="bg-[#F6F7FA] m-1 p-1 flex flex-grow  w-[9rem] md:w-[15rem] 
                        text-black placeholder-gray-600 text-sm outline-none rounded-[10px] mr-1"
                value={channelData.channelName}
                placeholder="Channel Name"
                onChange={(e) => {
                  setErrorName("");
                  setChannelData((prevState) => {
                    return { ...prevState, channelName: e.target.value };
                  });
                }}
              ></input>
            </div>
            {errorName && (
              <Text as="div" color="red">
                {errorName}
              </Text>
            )}

            <div className="mt-2 ">
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#254BD6" }}
                    checked={channelData.protected}
                    onChange={(event) => {
                      setErrorKey("");
                      setChannelData((prevState) => {
                        return { ...prevState, channlePassword: "" };
                      });
                      setChannelData((prevState) => {
                        return {
                          ...prevState,
                          protected: event.target.checked,
                        };
                      });
                    }}
                  />
                }
                label="Protected"
              />
            </div>

            <div className="flex bg-[#F6F7FA] mt-0  border rounded-[10px]  w-[10rem] md:w-[15rem]">
              <input
                className="bg-[#F6F7FA] m-1 p-1 flex flex-grow  w-[8rem] md:w-[15rem]
                        text-black placeholder-gray-600 text-sm outline-none"
                disabled={!channelData.protected}
                required={channelData.protected}
                type={isPasswordVisibleAlert ? "text" : "password"}
                placeholder="Channel Key"
                value={channelData.channelPassword}
                onChange={(e) => {
                  setErrorKey(""),
                    setChannelData((prevState) => {
                      return { ...prevState, channelPassword: e.target.value };
                    });
                }}
              ></input>
              <div
                className="cursor-pointer flex items-center pr-2"
                onClick={() => {
                  setIsPasswordVisibleAlert((pre) => {
                    return !pre;
                  });
                }}
              >
                {!isPasswordVisibleAlert ? (
                  <MdVisibilityOff size={18} color="black" />
                ) : (
                  <MdVisibility size={18} color="black" />
                )}
              </div>
            </div>
            {errorKey && (
              <Text as="div" color="red">
                {errorKey}
              </Text>
            )}

            <div className="flex bg-[#F6F7FA]  mt-2  border rounded-[10px]  w-[10rem] md:w-[15rem]">
              <input
                className="bg-[#F6F7FA] m-1 p-1 flex flex-grow  w-[9rem] md:w-[15rem]
                        text-black placeholder-gray-600 text-sm outline-none"
                type="text"
                placeholder="Add membres"
                value={memberSearch}
                onChange={(e) => {
                  setMemberSearch(e.target.value);
                }}
              ></input>
            </div>
            <div className="h-[5rem]">
              <ScrollArea scrollbars="vertical">{widgetSearsh}</ScrollArea>
            </div>
          </div>

          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              style={{
                background: "#4069FF",
                color: "white",
                paddingLeft: 20,
                paddingRight: 20,
                border: 10,
              }}
              onClick={() => {
                const parsName = channelNameSchema.safeParse(
                  channelData.channelName
                );
                const parskey = channelkeySchema.safeParse(
                  channelData.channelPassword
                );
                if (
                  parsName.success &&
                  (parskey.success || !channelData.protected)
                ) {
                  for (const user of membersChannel) {
                    setChannelData((prevState) => {
                      return {
                        ...prevState,
                        channelMember: [...prevState.channelMember, user.id],
                      };
                    });
                  }
                  setIsReady(true);
                } else {
                  if (!parsName.success) setErrorName("Invalid channel name");
                  if (!parskey.success && channelData.protected)
                    setErrorKey("Invalid channel key");
                }
              }}
            >
              Create
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
