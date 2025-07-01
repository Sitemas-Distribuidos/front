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

const contatos = [
  {
    chat_name: "Grupo 1",
    type: "group"
  },
  {
    chat_name: "Alicia",
    type: "person"
  },
  {
    chat_name: "Grupo 2",
    type: "group"
  },
  {
    chat_name: "Ryan",
    type: "person"
  },
  {
    chat_name: "Knosh",
    type: "person"
  },
  {
    chat_name: "Vinizaum",
    type: "person"
  },
  {
    chat_name: "Ricando",
    type: "person"
  },
  {
    chat_name: "Mikamel",
    type: "person"
  },
  {
    chat_name: "CEO",
    type: "person"
  },
  {
    chat_name: "Dev Team",
    type: "group"
  },
  {
    chat_name: "Marketing Teameeeeeeeeeeeeeeeeeeeee",
    type: "group"
  },
  {
    chat_name: "Fulano",
    type: "person"
  },
  {
    chat_name: "Ciclano",
    type: "person"
  },
  {
    chat_name: "Beltrano",
    type: "person"
  },
];

const Menu = ({ onClose }) => {

    let navigate = useNavigate();

    const { openModal } = useContext(ModalContext);

    const { sendMessage, socketData } = useSocket();

    // const searchInputRef = useRef(null);

    let user_id = localStorage.getItem("user_id");
    let user_name = localStorage.getItem("user_name");

    const dropdownRef = useRef(null);

    const [openDropdown, setOpenDropdown] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [searchChat, setSearchChat] = useState('');
    const [groupName, setGroupName] = useState(null);
    const [shouldFetchChatID, setShouldFetchChatID] = useState(false);

    const getchatID = useGetChatID(user_name, groupName, shouldFetchChatID);

    const { setChatID } = useContext(MessageContext);

    useEffect(() => {
        setContacts(contatos);

        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpenDropdown(null);
          }
        };

        sendMessage(JSON.stringify({
            channel: "user",
            method: "GET-contacts",
            _id: user_id,
        }));

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
      if (socketData?.contacts && Array.isArray(socketData.contacts)) {
        const usuariosFormatados = socketData.contacts.map(user => ({
          id: user._id,
          username: user.username,
        }));

        setContacts(usuariosFormatados);
      }
    }, [socketData]);

    // const filteredContact = contacts?.filter((contact) =>
    //     contact?.username.toLowerCase().includes(searchChat.toLowerCase())
    // );
    
    useEffect(() => {
      if (getchatID) {
        // console.log("Chat ID", getchatID);
        setChatID(getchatID);
      }
    }, [getchatID]);

    const handleOpenChat = (username) => {
      setGroupName(username)
      setShouldFetchChatID(true);
    }

    const handleToggle = (index) => {
      setOpenDropdown((prev) => (prev === index ? null : index));
    };

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
                  {contacts.map((contact, index) => (
                      <li key={index}>
                          <ChatIcon src={contact.type === "group" ?  group : person}/>
                          <div className="contact-info">
                            <span onClick={() => handleOpenChat(contact.username)}>{contact.username}</span>
                            <div ref={openDropdown === index ? dropdownRef : null}>
                              <MoreIcon src={more} title="More options" onClick={() => handleToggle(index)}/>
                              {openDropdown === index && (
                                <Dropdown onClose={() => setOpenDropdown(null)} />
                              )}
                            </div>

                          </div>
                      </li>
                  ))
                  }
              </ul>
            </div>
        </Sidebar>
     );
}
 
export default Menu;