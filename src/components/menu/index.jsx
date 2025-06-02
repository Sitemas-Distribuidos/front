/* ⚛ REACT */
import React, { useEffect, useRef, useState } from "react";

/* 📁 ASSETS*/
import { close, add, logout, group, person, search } from "../../assets/icons";

/* 🎨 STYLES */
import {  Container, CloseIcon, AddIcon, LogoutIcon, ChatIcon, SearchIcon } from "./styles";

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
];

const Menu = () => {
    const searchInputRef = useRef(null);

    const [contacts, setContacts] = useState([]);
    const [searchChat, setSearchChat] = useState('');

    console.log(searchChat, searchInputRef)

    useEffect(() => {
        setContacts(contatos);
    }, []);

    useEffect(() => {
        setContacts(contacts.filter(item => item.toLowerCase().includes(searchChat.toLowerCase())));
    }, [searchChat]);

    // const filteredItems = items.filter(item =>
    //     item.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const handleLogout = () => {
        console.log('logout')
    }

    return ( 
        <Container>
            <div className="buttons-container">
                <CloseIcon src={close} fill={'#403D39'}/>
                <div>
                    <AddIcon src={add} />
                    <LogoutIcon src={logout} fill={'#403D39'} onClick={() => handleLogout()}/>
                </div>
            </div>
            <div className="input-container">
                <SearchIcon src={search} fill={'#403D39'}/>
                <input type="text" onChange={e => setSearchChat(e.target.value)} placeholder="Search"/>
            </div>
            <ul>
                {contacts.map((contact, index) => (
                    <li key={index}>
                        <ChatIcon src={contact.type === "group" ?  group : person} fill={'#403D39'}/>
                        <p>{contact.chat_name}</p>
                    </li>
                ))
                }
            </ul>
        </Container>
     );
}
 
export default Menu;