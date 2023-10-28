'use client'
import { Button, DialogActions } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import { Avatar, Box, Flex, ScrollArea, Text } from '@radix-ui/themes';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";
import { useGlobalContext } from '../../../context/store';
import { getValideUsers } from '../api/fetch-users';
import { getColorStatus } from './ListUser';
import { z } from "zod";



export default function AlertAddChannel() {
    const [open, setOpen] = React.useState(false);

    const channelNameSchema = z.string()
        .min(3)
        .max(50)
        .refine((name) => /^[a-zA-Z0-9_-]+$/.test(name))

    const channelkeySchema = z.string()
        .min(3)
        .max(50)
        .refine((name) => /^[a-zA-Z0-9_\-@#!.]+$/.test(name))


    const [errorName, setErrorName] = useState("");
    const [errorKey, setErrorKey] = useState("");
    const [channelName, setChannelName] = useState('');
    const [channelType, setChannelType] = useState<string>('public');
    const [channelKey, setChannelKey] = useState('');
    const [member, setMember] = useState('');
    const [protect, setProtected] = useState<boolean>(false);

    const { user } = useGlobalContext();
    const [valideUsers, setValideUsers] = useState<userDto[]>([]);
    const [usersFilter, setUsersFilter] = useState<userDto[]>([]);
    const [membersChannel, setMembersChannel] = useState<userDto[]>([]);

    const handleChannelType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChannelType(event.target.value);
        console.log(event.target.value);
    };

    useEffect(() => {
        async function getData() {
            if (user.id !== '-1') {
                const temp = await getValideUsers(user.id);
                setValideUsers(temp);
            }
        }
        getData();
    }, [open, user.id]);

    useEffect(() => {
        const tmp: userDto[] = valideUsers.filter((elm) => {
            const username = elm.nickname;
            return ((username.includes(member) && member != '') || member === "*");
        })
        setUsersFilter(tmp);
    }, [member, valideUsers])

    const checkIsExist = (elm: userDto, list: userDto[]): boolean => {
        const fonud = list.find((tmp) => elm.id === tmp.id);
        if (fonud) return true;
        return false;
    }

    const widgetSearsh = usersFilter.map((elm) => {
        return <Box p="1" pr="3" className='mx-2' >
            <Flex align="center" justify="between" className='border-b py-2'>
                <div className='flex items-center relative'>
                    <Avatar
                        src={elm.profilePic}
                        fallback="T"
                        style={{ height: '30px', borderRadius: '30px' }}
                    />
                    <div className='absolute pt-5 pl-5'>
                        <GoDotFill size={15} color={getColorStatus(elm.status)} />
                    </div>
                    <Text size="3" weight="bold" className='pl-2'>
                        {elm.nickname}
                    </Text>
                </div>
                {checkIsExist(elm, membersChannel) ?
                    <IoPersonRemove color="red" onClick={() => {
                        setMembersChannel((prevMembers) =>
                            prevMembers.filter((member) => member.id !== elm.id));
                    }} /> :
                    <IoPersonAdd color="green" onClick={() => {
                        setMembersChannel((pre) => [...pre, elm]);
                    }} />
                }


            </Flex>
        </Box>
    });

    const [isMouseOver, setIsMouseOver] = useState('-1');
    const widgetMembers = membersChannel.map((elm) => {
        return <Box style={{ display: "inline-block" }}
            onMouseEnter={() => setIsMouseOver(elm.id)}
            onMouseLeave={() => setIsMouseOver('-1')}>
            <div className='flex  items-center  pl-2 pr-1.5 m-1'
                style={{ background: "pink", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                <p>{elm.nickname}</p>
                {(isMouseOver === elm.id) && <TiDelete onClick={() => {
                    setMembersChannel((prevMembers) =>
                        prevMembers.filter((member) => member.id !== elm.id));
                }} color='red' />}

            </div>
        </Box>
    })
    return (
        <div>

            <TbSquareRoundedPlusFilled style={{ color: 'blue', fontSize: '40px', cursor: 'pointer' }}
                onClick={() => setOpen(true)} />

            <Dialog
                open={open}
                keepMounted
            // onClose={handleClose}
            >
                <div className='flex justify-end mt-2 mr-2' >
                    <TiDelete onClick={() => setOpen(false)} size="30" />
                </div>
                <DialogTitle textAlign="center" >{"Create Channel"}</DialogTitle>
                <DialogContent className='w-[25rem] h-[25rem] '>

                    <div
                        style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center'
                        }}>

                        <ScrollArea type="always" scrollbars="vertical"
                            style={{
                                height: 300, width: 200,
                                alignItems: "center", justifyItems: "center"
                            }}>

                            <FormControl className='ml-2'>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group">

                                    <FormControlLabel
                                        control={
                                            <Radio checked={channelType === 'public'}
                                                value="public"
                                                onChange={handleChannelType}
                                            />} label="Public" />

                                    <FormControlLabel
                                        control={
                                            <Radio checked={channelType === 'private'}
                                                value="private"
                                                onChange={handleChannelType}

                                            />} label="Private" />

                                </RadioGroup>
                            </FormControl>

                            <TextField required fullWidth size="small" className='mt-3'
                                style={{ width: '200px', background: "#edf6f9", borderRadius: 5 }}
                                label="Channel Name" variant="outlined"
                                value={channelName}
                                onChange={(e) => { setErrorName(''); setChannelName(e.target.value) }} />
                            {errorName && <Text as="div" color='red'>{errorName}</Text>}

                            <FormControlLabel control={<Checkbox onChange={(event) => {
                                setErrorKey('');
                                setProtected(event.target.checked);
                            }} />} label="Protected" />

                            <TextField
                                disabled={!protect}
                                required={protect}
                                fullWidth size="small" className='mt-1'
                                style={{ width: '200px', background: "#edf6f9", borderRadius: 5 }}
                                label="Channel Key" variant="outlined"
                                value={channelKey}
                                onChange={(e) => { setErrorKey(''), setChannelKey(e.target.value) }} />
                            {errorKey && <Text as="div" color='red'>{errorKey}</Text>}

                            <div className='mt-2'> {widgetMembers}</div>
                            <TextField fullWidth size="small" className='mt-1'
                                style={{ width: '200px', background: "#edf6f9", borderRadius: 5 }}
                                label="Add membres" variant="outlined"
                                value={member}
                                onChange={(e) => { setMember(e.target.value) }} />
                            {widgetSearsh}


                        </ScrollArea>

                    </div>

                    <DialogActions style={{ justifyContent: 'center' }}>
                        <Button style={{ background: 'blue', color: "white" }}
                            onClick={() => {
                                const parsName = channelNameSchema.safeParse(channelName);
                                const parskey = channelkeySchema.safeParse(channelKey);
                                console.log("parskey-->", parskey);
                                if (parsName.success && (parskey.success || !protect)) {
                                    console.log("valide");
                                } else {

                                    if (!parsName.success) setErrorName('Invalid channel name');
                                    if (!parskey.success && protect) setErrorKey('Invalid channel key');
                                }



                            }}>Create</Button>
                    </DialogActions>

                </DialogContent>

            </Dialog>
        </div >
    );
}





