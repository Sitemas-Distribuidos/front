/* ⚛ REACT */
import React, { useContext, useEffect, useRef, useState } from "react";

/* 📦 LIBS */
import { useMediaQuery } from "@react-hook/media-query";

/* 🧩 COMPONENTS */
import Menu from "../../components/menu";

/* 🔗 SERVICE */
import { useSocket } from '../../hooks/useSocket';

/* 📁 ASSETS*/
import { send, clip, menu, group } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, SendIcon, ClipIcon, MenuIcon, ChatIcon } from "./styles";

import { useChatInfo } from "../../hooks/useChatInfo";

import { MessageContext } from "../../context/MessageContext";
const mensagens = [

];

const Chat = () => {
  const { chatID, messages } = useContext(MessageContext);
  
  const chatInfo = useChatInfo(chatID);

  document.title = "Chat";

  const isSmallScreen = useMediaQuery('(max-width: 720px)');

  const { sendMessage, socketData } = useSocket();
  let user_id = localStorage.getItem("user_id");

  const messageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chatName, setChatName] = useState('');
  const [recipientId, setRecipientId] = useState(null);

  const handleSubmit = () => {
    const files = fileInputRef.current.files;
    const messageText = messageInputRef.current.value;

    const message = {
      channel: "messages",
      method: "POST",
      chatId: chatID,
      senderId: user_id,
      content: messageText,
    };

    sendMessage(JSON.stringify(message));
  }

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  // const handleFileChange = (event) => {
  // // Get the first file from the selected files list
  //   const file = event.target.files[0];
  //   setSelectedFile(file); // Update state with the selected file
  // };

  useEffect(() => {
    if (chatInfo) {
      console.log("Chat info recebida:", chatInfo);
      if (chatInfo.type === "private"){
        const [usernameA, usernameB] = chatInfo.members;
        const otherUsername = user_id ? usernameB : usernameA;

        setChatName(otherUsername);

        sendMessage(JSON.stringify({
          channel: "user",
          method: "GET",
          username: otherUsername,
        }));
      } else {
        setChatName(chatInfo.name)
      }
    }
  }, [chatInfo]);

  useEffect(() => {
  if (socketData?.message === "Username founded") {
      setRecipientId(socketData._id);
      if (user_id === socketData._id){
        setChatName(chatInfo.members[1]);
      }
      // console.log("Recipient ID recebido:", socketData._id);
      // console.log("User id: ",user_id);

    }
  }, [socketData]);

    return(
        <Container>
            {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)}/>}
            {(!isSmallScreen || !isMenuOpen) &&
              <div className="chat-conatiner">
                <div className="chat-header">
                  {!isMenuOpen && <MenuIcon src={menu} onClick={() => handleOpenMenu()} title="Open menu"/>}
                  <div className="chat-name">
                    <ChatIcon src={group} />
                    <h2>{chatName}</h2>
                  </div>
                </div>
                <div className="chat">
                    {Array.isArray(messages) && messages.map((message, index) => (
                        <div 
                            className={`message-container ${
                              message.SenderID === user_id ? 'sent' : 'received'
                            }`}
                            key={index}
                          >
                            <div className="message-author"><strong>{message.SenderID}</strong></div>
                            <div className="message-text">{message.Content}</div>
                            <span className="message-time">
                              {new Date(message.Created_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <div>
                      <label>
                        <ClipIcon src={clip} title="Select a file"/>
                        <input className="hidden-input" type="file" accept="image/*" ref={fileInputRef} />
                      </label>
                      <input type="text" placeholder="Message" ref={messageInputRef}/>
                    </div>
                    <button onClick={() => handleSubmit()}>
                        <SendIcon src={send} title="Send message"/>
                    </button>
                </div>
              </div>
            }
        </Container>
    );
}

export default Chat;