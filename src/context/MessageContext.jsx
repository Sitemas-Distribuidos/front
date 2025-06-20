/* ⚛ REACT */
import React, { createContext, useState } from 'react';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
  
    const showMessage = (type, content = null) => {

      if (!type || !content) {
        console.error("Type and content are required to show a message.");
        return;
      }

      const id = Date.now();

      const newMessage = {
        id,
        type,
        content,
      };

      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      }, 3000);
    };
  
    const hideMessage = (id) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    };

  return (
    <MessageContext.Provider value={{ messages, showMessage, hideMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };