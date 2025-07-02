/* ⚛ REACT */
import React, { useEffect, useState, useContext, useRef } from "react";

/* 📦 LIBS */
import { useNavigate } from "react-router";

/* 🧩 COMPONENTS */
import Dropdown from "../dropdown";

/* 🧠 CONTEXT */
import { ModalContext } from '../../context/ModalContext';

/* 📁 ASSETS*/
import { close, logout, group, person, search, addPerson, addGroup, more } from "../../assets/icons";

/* 🎨 STYLES */
import { Sidebar, CloseIcon, LogoutIcon, ChatIcon, SearchIcon, AddPersonIcon, AddGroupIcon, MoreIcon } from "./styles";

/* 🔗 SERVICE */
import { useSocket } from '../../hooks/useSocket';
import { useGetChatID } from "../../services/chat/GetChatID";
import { MessageContext } from "../../context/MessageContext";

const Menu = ({ onClose, onClickChat }) => {

    let navigate = useNavigate();

    const { modal, openModal } = useContext(ModalContext);

    const { sendMessage, socketData } = useSocket();

    // const searchInputRef = useRef(null);

    let user = JSON.parse(localStorage.getItem("user"));

    const dropdownRef = useRef(null);

    const [openDropdown, setOpenDropdown] = useState(null);
    const [chats, setChats] = useState([]);
    const [searchChat, setSearchChat] = useState('');
    const [chatName, setChatName] = useState('');
    // const [groupName, setGroupName] = useState(null);
    // const [shouldFetchChatID, setShouldFetchChatID] = useState(false);

    // const getchatID = useGetChatID(user.name, groupName, shouldFetchChatID);

    // const { setChatID } = useContext(MessageContext);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setOpenDropdown(null);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    useEffect(() => {
      if (!modal.isOpen) {
        handleGetContacts();
      }
    }, [modal.isOpen]);

    // Defini o array de contatos
    useEffect(() => {
      console.log(socketData)
      if (socketData?.contacts && Array.isArray(socketData.contacts)) {
        const formattedUsers = socketData.contacts.map(user => ({
          id: user._id,
          username: user.username,
        }));
        setChats(formattedUsers);
      } 
      // else if (socketData?.chat_id) {
      //   onClickChat(socketData?.chat_id, chatName);
      // }
    }, [socketData]);

    // Filtra o chat por nome de usuário
    const filteredChat = chats?.filter((chat) =>
      chat?.username?.toLowerCase().includes(searchChat.toLowerCase())
    );

    // Pega todos os contatos do usuário
    const handleGetContacts = () => {
      sendMessage(JSON.stringify({
          channel: "user",
          method: "GET-contacts",
          _id: user.id,
      }));
    }

    // Cria uma nova conversa privada
    // const handleAddNewChat = (contactId, chatUsername) => {
    //   setChatName(chatUsername);
    //   sendMessage(JSON.stringify({
    //     channel: "chat",
    //     method: "POST",
    //     type: "private",
    //     members: [user.name, contactId],
    //   }));
    // }

    const handleGetChatId = (contactId) => {
      console.log('aqui')
      sendMessage(JSON.stringify({
        channel: "chat",
        method: "GET",
        type: "private",
        members: [user.name, contactId],
      }));
    }

    // Liga com a abertura do dropdown
    const handleToggle = (index) => {
      setOpenDropdown((prev) => (prev === index ? null : index));
    };

    // Remove chat
    const handleRemoveChat = (chatId) => {
      sendMessage(JSON.stringify({
        channel: "user",
        method: "DELETE-contact",
        _id: user.id,
        contact_id: chatId,
      }));
      handleGetContacts();
    }

    // Realiza logout
    const handleLogout = () => {
      localStorage.removeItem('user');
      navigate("/join");
    }

    return ( 
        <Sidebar>
            <div className="buttons-container">
                <div className="buttons-container-top">
                    <CloseIcon src={close} onClick={() => onClose()} title="Close menu"/>
                    <AddPersonIcon src={addPerson} title="New person" onClick={() => openModal('ADD')}/>
                    <AddGroupIcon src={addGroup} title="New group" onClick={() => openModal('CREATE')}/>
                </div>
                <LogoutIcon src={logout} onClick={() => handleLogout()} title="Logout"/>
            </div>
            <div className="content-container">
              <div className="input-container">
                  <SearchIcon src={search} />
                  <input type="text" onChange={e => setSearchChat(e.target.value)} placeholder="Search"/>
              </div>
              <ul>
                  {filteredChat.length > 0 &&
                    filteredChat?.map((chat, index) => (
                      // <li key={index} onClick={() => handleAddNewChat(chat.id, chat.username)}>
                        <li key={index} onClick={() => handleGetChatId(chat.id, chat.username)}>
                          <ChatIcon src={chat.type === "group" ?  group : person}/>
                          <div className="chat-info">
                            <span>{chat.username}</span>
                            <div ref={openDropdown === index ? dropdownRef : null}>
                              <MoreIcon src={more} title="More options" onClick={(e) => {
                                e.stopPropagation();
                                handleToggle(index)}}/>
                              {openDropdown === index && (
                                <Dropdown onClose={() => setOpenDropdown(null)} onClick={() => handleRemoveChat(chat.id)}/>
                              )}
                            </div>
                          </div>
                      </li>
                  ))}
              </ul>
            </div>
        </Sidebar>
     );
}
 
export default Menu;