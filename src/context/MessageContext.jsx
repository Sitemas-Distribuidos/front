/* ⚛ REACT */
import React, { createContext, useState } from 'react';


const MessageContext = createContext();

const MessageProvider = ({ children }) => {

    const [message, setMessage] = useState({
      isShowingUp: false,
      type: null,
      content: null,
    });
  
    const showMessage = (type, content = null) => {
      setMessage({ isShowingUp: true, type, content });
    };
  
    const hideMessage = () => {
      setMessage({ isShowingUp: false, type: null, content: null });
    };

  return (
    <MessageContext.Provider value={{ message, showMessage, hideMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };