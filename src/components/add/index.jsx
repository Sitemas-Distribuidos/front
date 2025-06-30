/* ⚛ REACT */
import { useState, useContext, useEffect } from "react";

/* 🧠 CONTEXT */
import { ModalContext } from '../../context/ModalContext';
import { MessageContext } from '../../context/MessageContext';

/* 📁 ASSETS */
import { add, person, remove, search } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, AddIcon, PersonIcon, AddOrRemoveIcon, SearchIcon } from "./styles";

const contatos = [
  {
    id: 1,
    chat_name: "Alicia",
    type: "person"
  },
  {
    id: 2,
    chat_name: "Ryan",
    type: "person"
  },
  {
    id: 3,
    chat_name: "Knosh",
    type: "person"
  },
  {
    id: 4,
    chat_name: "Vinizaum",
    type: "person"
  },
  {
    id: 5,
    chat_name: "Ricando",
    type: "person"
  },
  {
    id: 6,
    chat_name: "Mikamel",
    type: "person"
  },
  {
    id: 7,
    chat_name: "C.E.O.",
    type: "person"
  },
  {
    id: 8,
    chat_name: "Fulano",
    type: "person"
  },
  {
    id: 9,
    chat_name: "Ciclano",
    type: "person"
  },
  {
    id: 10,
    chat_name: "Beltrano",
    type: "person"
  },
];

const Add = () => {

    const { closeModal } = useContext(ModalContext);
    const { showMessage } = useContext(MessageContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isPlusIcon, setIsPlusIcon] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [selected, setSelected] = useState([]);
    const [searchUser, setSearchUser] = useState('');

    useEffect(() => {
        setContacts(contatos);
    }, []);

    const filteredUsers = contacts.filter((contact) =>
        contact.chat_name.toLowerCase().includes(searchUser.toLowerCase())
    );

    const handleChange = (index) => {
      setIsPlusIcon(!isPlusIcon);
      if (selected.includes(index)) {
        setSelected([]);
      } else {
        setSelected([index]);
      }
    }  

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            closeModal();
            showMessage('warning', 'Contact added successfully!');
        }, 3000); 
    }

    return (
        <Container>
            <h1>Add Contact</h1>
            <div className="input-container">
                <SearchIcon src={search} />
                <input type="text" onChange={e => setSearchUser(e.target.value)} placeholder="Search user"/>
            </div>
            <ul>
                <h3>Users List</h3>
                {filteredUsers.map((contact, index) => (
                    <li key={index}>
                        <PersonIcon src={person} />
                        <div className="contact-info">
                            <span>{contact.chat_name}</span>
                            <AddOrRemoveIcon src={selected.includes(index) ? remove : add} onClick={() => handleChange(index)}/>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => handleSubmit()} disabled={isLoading}>
                <AddIcon src={add} />
                {isLoading ? "Adding..." : "Add"}
            </button>
        </Container>
    );
}

export default Add;