"use client";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { socket } from "@/lib/socket";
export default function MessagePage() {
  const { user } = usePrivy();
  const currentUserId = user?.id;
  // const currentRole = localStorage.getItem("role");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const [currentRole, setCurrentRole] = useState("");

  useEffect(() => {
    setCurrentRole(localStorage.getItem("role") || "");
  }, []);

  // SOCKET
  useEffect(() => {
    if (!currentUserId) return;
    socket.connect();
    socket.emit("join", currentUserId);
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [currentUserId]);

  // LOAD USERS
  useEffect(() => {
    async function loadUsers() {
      const roleToFetch = currentRole === "student" ? "instructor" : "student";
      const res = await fetch(`/api/users?role=${roleToFetch}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    }
    loadUsers();
  }, [currentRole]);

  // OPEN CHAT
  async function openChat(userData) {
    setSelectedUser(userData);
    try {
      const res = await fetch(
        `/api/messages?senderId=${currentUserId}&receiverId=${userData.privyId}`,
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.log(error);
      setMessages([]);
    }
  }

  // SEND
  async function sendMessage() {
    if (!text.trim()) return;

    const msg = {
      senderId: currentUserId,
      receiverId: selectedUser.privyId,
      text,
    };

    // SAVE DB
    await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msg),
    });

    // SOCKET
    socket.emit("sendMessage", msg);

    // LOCAL UI
    setMessages((prev) => [...prev, msg]);

    setText("");
  }

  return (
    <div className="h-screen bg-[#f5f7fb] flex">
      {/* SIDEBAR */}
      <div className="w-[320px] bg-white border-r flex flex-col">
        {/* HEADER */}
        <div className="p-5 border-b">
          <h1 className="text-2xl font-bold text-[#00C950]">Messages</h1>

          <p className="text-sm text-gray-500 mt-1">
            {currentRole === "student"
              ? "Available Instructors"
              : "Available Students"}
          </p>
        </div>

        {/* USERS */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {users.map((u) => (
            <div
              key={u._id}
              onClick={() => openChat(u)}
              className={`p-4 rounded-2xl cursor-pointer transition-all
              ${
                selectedUser?.privyId === u.privyId
                  ? "bg-[#00C950] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* AVATAR */}
                <div
                  className="w-12 h-12 rounded-full bg-white text-[#00C950]
                flex items-center justify-center font-bold text-lg"
                >
                  {u.name?.charAt(0)}
                </div>

                {/* INFO */}
                <div>
                  <h2 className="font-semibold">{u.name}</h2>

                  <p
                    className={`text-sm
                  ${
                    selectedUser?.privyId === u.privyId
                      ? "text-white/80"
                      : "text-gray-500"
                  }`}
                  >
                    {u.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* CHAT HEADER */}
            <div className="bg-white border-b p-4 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full bg-[#00C950]
              text-white flex items-center justify-center font-bold text-lg"
              >
                {selectedUser.name?.charAt(0)}
              </div>

              <div>
                <h2 className="font-bold text-lg">{selectedUser.name}</h2>

                <p className="text-sm text-green-500">Online</p>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {Array.isArray(messages) &&
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex
                    ${
                      msg.senderId === currentUserId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-5 py-3 rounded-2xl max-w-[350px]
                      shadow-sm text-sm
                      ${
                        msg.senderId === currentUserId
                          ? "bg-[#00C950] text-white rounded-br-md"
                          : "bg-white rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
            </div>

            {/* INPUT */}
            <div className="bg-white border-t p-4">
              <div className="flex items-center gap-3">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-100 rounded-full px-5 py-3
                  outline-none focus:ring-2 focus:ring-[#00C950]"
                />

                <button
                  onClick={sendMessage}
                  className="bg-[#00C950] hover:bg-green-600
                  text-white px-6 py-3 rounded-full font-semibold transition-all"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-700 mb-3">
                Select a Chat
              </h2>

              <p className="text-gray-500">
                Start conversation with{" "}
                {currentRole === "student" ? "an instructor" : "a student"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
