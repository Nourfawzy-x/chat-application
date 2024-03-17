import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "../chat/Chat";
const socket = io.connect("http://localhost:3001");

export default function Socket() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      setLoading(true);
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <>
      <div className="App">
        {!showChat ? (
          <div className="joinChatContainer">
            <h3>join a chat</h3>
            <input
              type="text"
              placeholder="john...."
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="room...."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom} disabled={loading}>
              {loading ? "Loading..." : "Join a room"}
            </button>
          </div>
        ) : (
          <Chat socket={socket} userName={userName} room={room} />
        )}
      </div>
    </>
  );
}
