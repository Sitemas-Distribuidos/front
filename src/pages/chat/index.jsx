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

import { usePostMessage } from "../../services/chat/PostMessage";

import { MessageContext } from "../../context/MessageContext";
const mensagens = [

];

const Chat = () => {

    document.title = "Chat";

    const isSmallScreen = useMediaQuery('(max-width: 720px)');

    const { sendMessage, socketData } = useSocket();
    const { chatID, messages } = useContext(MessageContext);
    let user_id = localStorage.getItem("user_id");

    const messageInputRef = useRef(null);
    const fileInputRef = useRef(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [chatName, setChatName] = useState('');

    const handleSubmit = () => {
      const files = fileInputRef.current.files;
      const messageText = messageInputRef.current.value;

      console.log("CHAT ID: ",chatID);
      console.log("User id: ",user_id);

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
      // setMessages(mensagens);
    }, [])

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