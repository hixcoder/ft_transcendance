"use client";
import { useGlobalContext } from "@/app/context/store";
import Pong from "../components/Randmpong";
import { Canvas, canvasContext } from "../components/interface";

import { useContext, useEffect, useState } from "react";

// import WaitingForPlayer from "../components/WaitingForPlayer";

export default function Home() {
  const { user,socket } = useGlobalContext();
  
  const [message, setMessage] = useState("Start game!");
  const [room, setRoom] = useState("");
  const [left, setLeft] = useState<boolean>(true);

  const canvas: Canvas = {
    width: 600,
    height: 400,
  };
  const [gameStarted, setGameStarted] = useState(false);

  const startGameHandler = () => {
    setMessage("Waiting for another player...");
    socket?.emit("joinRoom", user.id);
  };

  useEffect(() => {
    socket?.on("startGame", (room: string) => {
      setRoom(room);
      setGameStarted(true);
      // setLeft(left);
      console.log({ isLeft: left });
      setMessage("Game started! You can play now.");
      console.log("aloo: game started");
    });

    socket?.on("whichSide", (isLeft: boolean) => {
      setLeft(isLeft);
    });

    return () => {
      socket?.off("startGame");
      socket?.off("whichSide");
    };
  }, [user.id]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-color-main">
      {/* <WebsocketProvider value={socket}> */}
        <canvasContext.Provider value={canvas}>
          {!gameStarted && (
            <div className="flex flex-col justify-center m-auto bg-black rounded-md w-96 h-96">
              <div className="bg-white w-3 h-1/3 rounded-full mb-4"></div>
              <button
                className="bg-color-main-whith text-white w-fit mx-auto px-2 py-1 rounded-md"
                onClick={startGameHandler}
              >
                {message}
              </button>
            </div>
          )}
          {gameStarted && <Pong room={room} isLeft={left} />}
        </canvasContext.Provider>
      {/* </WebsocketProvider> */}
    </div>
  );
}