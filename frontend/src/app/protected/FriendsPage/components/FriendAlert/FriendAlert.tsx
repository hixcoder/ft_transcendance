"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import FriendSearchItem from "./FriendSearchItem";
import {
  getOnlineFriends,
  getAllFriends,
  getPendingFriends,
  getBlockedFriends,
  getAllUsers,
} from "@/app/api/hixcoder/FriendsPage";
import { useGlobalContext } from "@/app/context/store";
import Link from "next/link";
import { ImCross } from "react-icons/im";
import { ChangeEvent, useState } from "react";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export function FriendAlert(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  // ================== fetch users ==================
  const [data, setData] = React.useState<friendDto[]>([]);
  const { user } = useGlobalContext();
  React.useEffect(() => {
    async function getData() {
      try {
        let dataTmp = [];

        dataTmp = await getAllUsers(user.id);
        console.log(dataTmp);
        setData(dataTmp);
        return data;
      } catch (error: any) {
        console.log("Friend alert getData error: " + error);
      }
    }
    getData();
  }, [open]);
  // ================== /fetch users ==================

  // ================== /handle search ==================
  const [inputSearch, setInputSearch] = useState("");
  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    setInputSearch(event.target.value);
    console.log(inputSearch);
  }

  const filteredData = data.filter((user) => {
    return user.username.toLowerCase().includes(inputSearch.toLowerCase());
  });
  console.log(filteredData);
  // ================== /handle search ==================

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="w-fit p-4">
        <div onClick={handleClose} className="flex flex-row justify-end mb-2">
          <ImCross className="text-gray-400 hover:text-color-main cursor-pointer" />
        </div>
        <DialogTitle>Add Friends</DialogTitle>

        <input
          type="text"
          name="price"
          className="block w-96 rounded-xl  py-3 mx-8 mb-8 pl-7 pr-20 text-gray-900  bg-[#F1F3F9]  text-lg
          ring-1 ring-inset ring-gray-300 placeholder:text-[#666C79]
          sm:text-sm sm:leading-6
          focus:outline-none"
          placeholder="Enter friend username"
          onChange={handleSearch}
        ></input>
        <div className="h-96 overflow-auto mb-8 ">
          {filteredData.map((element) => (
            // <ListItem disableGutters key={email}>
            //   <ListItemButton onClick={() => handleListItemClick(email)}>
            //     <ListItemText primary={email} />
            //   </ListItemButton>
            // </ListItem>
            <FriendSearchItem
              friendImg={element.avatar}
              friendName={element.username}
            />
          ))}
        </div>
      </div>
    </Dialog>
  );
}
