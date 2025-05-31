import React, { useEffect, useRef, useState } from "react";
import { Container, SendIcon } from "./styles";
import send from "../../assets/icons/send.svg";

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

    const usermessageRef = useRef();

    const [messages, setMessages] = useState([]);

    const handleSubmit = () => {
        console.log("oi")
    }

    useEffect(() => {
        setMessages(mensagens)
    }, [])

    return(
        <Container>
            <div className="chat">
                {messages.map((message, index) => (
                    <div className={`message-container ${message.is_mine && 'message-mine'}`} key={index}>
                        <div className="message-author"><strong>{message.author}</strong></div>
                        <div className="message-text">{message.text}</div>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input type="text" placeholder="Message" ref={usermessageRef}/>
                <button onClick={() => handleSubmit()}>
                    <SendIcon src={send} fill="#FFFcF2"/>
                </button>
            </div>
        </Container>
    );
}

export default Chat;