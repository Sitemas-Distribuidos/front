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

const Menu = ({ onClose }) => {

    let navigate = useNavigate();

    const { openModal } = useContext(ModalContext);

    const { sendMessage, socketData } = useSocket();

    // const searchInputRef = useRef(null);

    let user_id = localStorage.getItem("user_id");
    let user_name = localStorage.getItem("user_name");

    const dropdownRef = useRef(null);

    const [openDropdown, setOpenDropdown] = useState(null);
    const [chats, setChats] = useState([]);
    const [searchChat, setSearchChat] = useState('');
    const [groupName, setGroupName] = useState(null);
    const [shouldFetchChatID, setShouldFetchChatID] = useState(false);

    const getchatID = useGetChatID(user_name, groupName, shouldFetchChatID);

    const { setChatID } = useContext(MessageContext);

    useEffect(() => {

        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpenDropdown(null);
          }
        };

        handleGetContacts();

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
      if (socketData?.contacts && Array.isArray(socketData.contacts)) {
        const formattedUsers = socketData.contacts.map(user => ({
          id: user._id,
          username: user.username,
        }));
        setChats(formattedUsers);
      } else {
        setChats([]);
      }
    }, [socketData]);

    const filteredChat = chats?.filter((chat) =>
        chat?.username?.toLowerCase().includes(searchChat.toLowerCase())
    );
    
    useEffect(() => {
      if (getchatID) {
        // console.log("Chat ID", getchatID);
        setChatID(getchatID);
      }
    }, [getchatID]);

    const handleGetContacts = () => {
        sendMessage(JSON.stringify({
            channel: "user",
            method: "GET-contacts",
            _id: user_id,
        }));
    }

    const handleOpenChat = (username) => {
      setGroupName(username)
      setShouldFetchChatID(true);
    }

    const handleToggle = (index) => {
      setOpenDropdown((prev) => (prev === index ? null : index));
    };

    const handleRemoveChat = (chatId) => {
      sendMessage(JSON.stringify({
        channel: "user",
        method: "DELETE-contact",
        _id: user_id,
        contact_id: chatId,
      }));
      handleGetContacts();
    }

    const handleLogout = () => {
      localStorage.removeItem('user_id');
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
                      <li key={index}>
                          <ChatIcon src={chat.type === "group" ?  group : person}/>
                          <div className="chat-info">
                            <span onClick={() => handleOpenChat(chat.username)}>{chat.username}</span>
                            <div ref={openDropdown === index ? dropdownRef : null}>
                              <MoreIcon src={more} title="More options" onClick={() => handleToggle(index)}/>
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