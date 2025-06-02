/* ⚛ REACT */
import React, { useEffect, useRef, useState } from "react";

/* 🧩 COMPONENTS */
import Menu from "../menu";

/* 📁 ASSETS*/
import { send, clip, menu } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, SendIcon, ClipIcon, MenuIcon } from "./styles";

const mensagens = [
  {
    author: "João",
    text: "E aí, tudo certo?",
    is_mine: true
  },
  {
    author: "Maria",
    text: "Tudo sim! E contigo?",
    is_mine: false
  },
  {
    author: "Carlos",
    text: "Bora marcar aquele rolê no finde?",
    is_mine: false
  },
  {
    author: "Ana",
    text: "Tô dentro! Que horas?",
    is_mine: false
  },
  {
    author: "João",
    text: "Às 17h fica bom para todos?",
    is_mine: true
  },
];

const Chat = () => {

    const messageInputRef = useRef(null);
    const fileInputRef = useRef(null);

    const [messages, setMessages] = useState([]);

    const handleSubmit = () => {
        console.log(fileInputRef.current.value);
    }

    const handleOpenMenu = () => {

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
            <Menu />
            <div className="chat-conatiner">
              <div>
              <MenuIcon src={menu} fill="#FFFcF2" onClick={() => handleOpenMenu()}/>
            </div>
            <div className="chat">
                {messages.map((message, index) => (
                    <div className={`message-container ${message.is_mine && 'message-mine'}`} key={index}>
                        <div className="message-author"><strong>{message.author}</strong></div>
                        <div className="message-text">{message.text}</div>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <div>
                  <label>
                    <ClipIcon src={clip} fill="#FFFcF2" />
                    <input className="hidden-input" type="file" accept="image/*" ref={fileInputRef} />
                  </label>
                  <input type="text" placeholder="Message" ref={messageInputRef}/>
                </div>
                <button onClick={() => handleSubmit()}>
                    <SendIcon src={send} fill="#FFFcF2"/>
                </button>
            </div>
            </div>
        </Container>
    );
}

export default Chat;