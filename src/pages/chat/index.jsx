/* ⚛ REACT */
import React, { useContext, useEffect, useRef, useState } from "react";

/* 📦 LIBS */
import { useMediaQuery } from "@react-hook/media-query";

/* 🧩 COMPONENTS */
import Menu from "../../components/menu";

/* 🔗 SERVICE */
import { useSocket } from '../../hooks/useSocket';

/* 📁 ASSETS*/
import { send, clip, menu, group, person } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, SendIcon, ClipIcon, MenuIcon, ChatIcon } from "./styles";

import { useChatInfo } from "../../hooks/useChatInfo";

import { MessageContext } from "../../context/MessageContext";

const Chat = () => {
  // const { messages } = useContext(MessageContext);
  
  // const chatInfo = useChatInfo(chatID);

  document.title = "Chat";

  const isSmallScreen = useMediaQuery('(max-width: 720px)');

  const { sendMessage, socketData } = useSocket();
  let user = JSON.parse(localStorage.getItem("user"));

  const messageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [chatName, setChatName] = useState('');
  // const [recipientId, setRecipientId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  // const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const [chat, setChat] = useState({
    id: '',
    name: '',
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
      if (socketData?.msg) {
        const formattedMessage = socketData.msg?.map(message => ({
            id: message.ID,
            sender: message.SenderID,
            content: message.Content,
            created: message.Created_at,
          }));
          console.log(formattedMessage)
        setChatMessages(formattedMessage)
      }
  }, [socketData])

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSubmit = () => {
    const trimmedMessage = messageInputRef.current.value.trim();
    if (!trimmedMessage) return;

    handleSendMessage(trimmedMessage);
    
    const newMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender: user.id,
      content: trimmedMessage,
      created: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, newMessage]);

    messageInputRef.current.value = '';
  }

  const handleSendMessage = (message) => {
    if (chat.id) {
      sendMessage(JSON.stringify({
      channel: "messages",
      method: "POST",
      chatId: chat.id,
      senderId: user.id,
      content: message,
    }));
    }
  }

  // Pega as informações do chat
  const handleGetChatInfo = (chatId) => {
    sendMessage(JSON.stringify({
      channel: "chat",
      method: "GET-info",
      chatId: chatId,
    }));
  }

  // Pega todas as mensagens do chat
  const handleGetAllChatMessages = (chatId) => {
    console.log(chatId)
      sendMessage(JSON.stringify({
        channel: "messages",
        method: "GET",
        chatId: chatId,
      }));
  }

  // Abre conversa
    const handleOpenChat = (chatId, chatName) => {
      setChat({
        id: chatId,
        name: chatName,
      });

      handleGetAllChatMessages(chatId);
  }

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  // const handleFileChange = (event) => {
  // // Get the first file from the selected files list
  //   const file = event.target.files[0];
  //   setSelectedFile(file); // Update state with the selected file
  // };

  // useEffect(() => {
  //   if (chatInfo) {
  //     if (chatInfo.type === "private"){
  //       const [usernameA, usernameB] = chatInfo.members;
  //       const chatName = (user_name == usernameA)? usernameB : usernameA;

  //       setChatName(chatName);
  //     } else {
  //       setChatName(chatInfo.name)
  //     }
  //   }
  // }, [chatInfo]);

  // useEffect(() => {
  // if (socketData?.message === "Username founded") {
  //   }
  // }, [socketData]);

    return(
        <Container>
            {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} onClickChat={(chatId, chatName) => handleOpenChat(chatId, chatName)}/>}
            {(!isSmallScreen || !isMenuOpen) &&
              <div className="chat-conatiner">
                <div className="chat-header">
                  {!isMenuOpen && <MenuIcon src={menu} onClick={() => handleOpenMenu()} title="Open menu"/>}
                  <div className="chat-name">
                    {chat.name && <ChatIcon src={person} />}
                    <h2>{chat.name}</h2>
                  </div>
                </div>
                <div className="chat">
                    {chatMessages?.map((message, index) => (
                        <div className={`message-container ${message.sender === user.id ? 'message-mine' : 'received'}`} key={index}>
                            <div className="message-author"><strong>{message.sender}</strong></div>
                            <div className="message-text">{message.content}</div>
                            <span className="message-time">
                              {new Date(message.created).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> 
                </div>
                <div className="input-container">
                    <div>
                      <label>
                        <ClipIcon src={clip} title="Select a file"/>
                        <input className="hidden-input" type="file" accept="image/*" ref={fileInputRef} />
                      </label>
                      <input 
                          type="text" 
                          placeholder="Message" 
                          ref={messageInputRef}
                          onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                          }
                        }}/>
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