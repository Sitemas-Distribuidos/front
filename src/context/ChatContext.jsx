/* ⚛ REACT */
import React, { createContext, useState, useEffect, useContext} from 'react';
import { useChatSocket } from '../hooks/useChatSocket';
import { MessageContext } from './MessageContext';
const ChatContext = createContext();

const ChatProvider = ({ children, username1, username2 }) => {
    
    const { chatID, messages, setMessages, addMessage} = useContext(MessageContext);
    let user_id = localStorage.getItem("user_id");
    
     const [shouldConnect, setShouldConnect] = useState(false);

    // Habilita a conexão quando o chatID muda e é válido
    useEffect(() => {
        if (chatID && user_id) {
        setShouldConnect(true);
        }
    }, [chatID, user_id]);


    const { socketChat, sendChatMessage } = useChatSocket(
        shouldConnect ? chatID : null,
        shouldConnect ? user_id : null
    );

    // Recebe uma mensagem do chat e concatena as mensagens que ja tinha
    useEffect(() => {
        if(socketChat){
            if (socketChat.senderId === user_id) return;

            const newMessage = {
                ID: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                SenderID: socketChat.senderId,
                Content: socketChat.content,
                Created_at: new Date().toISOString(),
            };
            addMessage(newMessage)
        }
    }, [socketChat]);

    // const showChatMessage = (type, content = null) => {

    //     if (!type || !content) {
    //     console.error("Type and content are required to show a message.");
    //     return;
    //     }

    //     const id = Date.now();

    //     const newMessage = {
    //     id,
    //     type,
    //     content,
    //     };

    //     setMessages((prev) => [...prev, newMessage]);

    //     setTimeout(() => {
    //     setMessages((prev) => prev.filter((msg) => msg.id !== id));
    //     }, 3000);
    // };

    return (
        <ChatContext.Provider value={{ 
            messages,
            addMessage,
            chatID,
            // showChatMessage, 
            sendChatMessage
        }}>
        {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatProvider };