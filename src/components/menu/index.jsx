/* ⚛ REACT */
import React, { useEffect, useState, useContext } from "react";

/* 🧠 CONTEXT */
import { ModalContext } from '../../context/ModalContext';

/* 📁 ASSETS*/
import { close, logout, group, person, search, addPerson, addGroup, more } from "../../assets/icons";

/* 🎨 STYLES */
import {  Container, CloseIcon, LogoutIcon, ChatIcon, SearchIcon, AddPersonIcon, AddGroupIcon, MoreIcon } from "./styles";

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

    const { openModal } = useContext(ModalContext);

    // const searchInputRef = useRef(null);

    const [contacts, setContacts] = useState([]);
    const [searchChat, setSearchChat] = useState('');


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
                            <span>{contact.chat_name}</span>
                            <MoreIcon src={more} fill={'#403D39'} onClick={() => {
                              
                            }}/>
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