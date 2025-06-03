/* ⚛ REACT */
import React, { useEffect, useRef, useState } from "react";

/* 📁 ASSETS*/
import { close, add, logout, group, person, search } from "../../assets/icons";

/* 🎨 STYLES */
import {  Container, CloseIcon, AddIcon, LogoutIcon, ChatIcon, SearchIcon, IconCircle } from "./styles";

import { fetchUsersWebSocket } from "../../API/UserSocket/UserImporter";

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
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchChat, setSearchChat] = useState('');

    const handleLogout = () => {
        console.log('logout')
    }
    
    useEffect(() => {
        fetchUsersWebSocket()
            .then((users) => {
            setContacts(users);
            console.log("users:",users)
            setFilteredContacts(
                contacts.filter(
                    item =>
                    item.Username &&
                    item.Username.toLowerCase().includes(searchChat.toLowerCase())
                )
                );
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
    if (!Array.isArray(contacts)) return;

    setFilteredContacts(
        contacts.filter(item => 
            typeof item.Username === 'string' && 
            item.Username.toLowerCase().includes(searchChat.toLowerCase())
        )
    );
    }, [searchChat, contacts]);


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
                {filteredContacts.map((contact, index) => (
                    <li key={index}>
                         <IconCircle>
                            <ChatIcon src={contact.Username ? person : group} fill={'#403D39'} />
                        </IconCircle>
                        <p>{contact.Username}</p>
                    </li>
                ))
                }
            </ul>
        </Container>
     );
}
 
export default Menu;