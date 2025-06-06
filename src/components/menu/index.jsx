/* ⚛ REACT */
import React, { useEffect, useRef, useState, useContext } from "react";

/* 📁 ASSETS*/
import { close, logout, group, person, search, addPerson, addGroup, more } from "../../assets/icons";

/* 🎨 STYLES */
import {  Container, CloseIcon, LogoutIcon, ChatIcon, SearchIcon, AddPersonIcon, AddGroupIcon, MoreIcon } from "./styles";

/* 📁 CONTEXT */
import { ModalContext } from '../../context/ModalContext';

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
];

const Menu = ({ onClose }) => {

    const { openModal } = useContext(ModalContext);

    const searchInputRef = useRef(null);

    const [contacts, setContacts] = useState([]);
    const [searchChat, setSearchChat] = useState('');

    // console.log(searchChat, searchInputRef)

    useEffect(() => {
        setContacts(contatos);
    }, []);

    const contatosFiltrados = contacts.filter((contact) =>
        contact.chat_name.toLowerCase().includes(searchChat.toLowerCase())
    );

    const handleLogout = () => {
        console.log('logout')
    }

    return ( 
        <Container>
            <div className="buttons-container">
                <div className="buttons-container-top">
                    <CloseIcon src={close} fill={'#403D39'} onClick={() => onClose()} title="Close menu"/>
                    <AddPersonIcon src={addPerson} title="New person" fill={'#403D39'} onClick={() => openModal('ADD')}/>
                    <AddGroupIcon src={addGroup} title="New group" fill={'#403D39'} onClick={() => openModal('CREATE')}/>
                </div>
                <LogoutIcon src={logout} fill={'#403D39'} onClick={() => handleLogout()} title="Logout"/>
            </div>
            <div className="content-container">
              <div className="input-container">
                  <SearchIcon src={search} fill={'#403D39'}/>
                  <input type="text" onChange={e => setSearchChat(e.target.value)} placeholder="Search"/>
              </div>
              <ul>
                  {contatosFiltrados.map((contact, index) => (
                      <li key={index}>
                          <ChatIcon src={contact.type === "group" ?  group : person} fill={'#403D39'}/>
                          <div className="contact-info">
                            <p>{contact.chat_name}</p>
                            <MoreIcon src={more} fill={'#403D39'}/>
                          </div>
                      </li>
                  ))
                  }
              </ul>
            </div>
        </Container>
     );
}
 
export default Menu;