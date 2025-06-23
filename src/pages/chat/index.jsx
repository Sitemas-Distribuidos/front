/* ⚛ REACT */
import React, { useEffect, useRef, useState } from "react";

/* 📦 LIBS */
import { useMediaQuery } from '@react-hook/media-query'

/* 🧩 COMPONENTS */
import Menu from "../../components/menu";

/* 📁 ASSETS*/
import { send, clip, menu, group } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, SendIcon, ClipIcon, MenuIcon, ChatIcon } from "./styles";

const mensagens = [
  {
    author: "João",
    text: "E aí, tudo certo?",
    is_mine: true
  },
  {
    author: "Dionys",
    text: "Tudo sim! E contigo?",
    is_mine: false
  },
  {
    author: "Knosh",
    text: "Bora marcar aquele rolê no finde?",
    is_mine: false
  },
  {
    author: "Thiago",
    text: "Tô dentro! Que horas?",
    is_mine: false
  },
  {
    author: "João",
    text: "Às 17h fica bom para todos?",
    is_mine: true
  },
  {
    author: "Mikamel",
    text: "Onde vai ser?",
    is_mine: false
  },
  {
    author: "Vinizaum",
    text: "Vai ser na casa do Ryan",
    is_mine: false
  },
  {
    author: "C.E.O.",
    text: "Não esqueçam de levar as bebidas!",
    is_mine: false
  },
  {
    author: "Ryan",
    text: "Claro, vou levar cerveja!",
    is_mine: false
  },
];

const Chat = () => {

    document.title = "Chat";

    const isSmallScreen = useMediaQuery('(max-width: 720px)');

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