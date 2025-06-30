/* ⚛ REACT */
import React, { useEffect, useRef, useState } from "react";

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

const mensagens = [

];

const Chat = () => {

    document.title = "Chat";

    const isSmallScreen = useMediaQuery('(max-width: 720px)');

    const { sendMessage, socketData } = useSocket();

    const messageInputRef = useRef(null);
    const fileInputRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSubmit = () => {
        console.log(fileInputRef.current.value);
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
      setMessages(mensagens);
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
                    <h2>Maior nome possível já existente na face da Terra</h2>
                  </div>
                </div>
                <div className="chat">
                    {messages.map((message, index) => (
                        <div className={`message-container ${message.is_mine && 'message-mine'}`} key={index}>
                            <div className="message-author"><strong>{message.author}</strong></div>
                            <div className="message-text">{message.text}</div>
                            <span>{message.hour}</span>
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