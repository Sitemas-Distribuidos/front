/* ⚛ REACT */
import { useState, useEffect, useContext } from "react";

/* 🧠 CONTEXT */
import { ModalContext } from '../../context/ModalContext';
import { MessageContext } from '../../context/MessageContext';

/* 📁 ASSETS */
import { person, add, remove } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, AddIcon, AddOrRemoveIcon, PersonIcon } from "./styles";

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

const Create = () => {

    const { closeModal } = useContext(ModalContext);
    const { showMessage } = useContext(MessageContext);

    const [contacts, setContacts] = useState([]);
    const [isPlusIcon, setIsPlusIcon] = useState(true);
    const [selected, setSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setContacts(contatos);
    }, []);

    const handleChange = (index) => {
      setIsPlusIcon(!isPlusIcon);
      if (selected.includes(index)) {
        setSelected(selected.filter((i) => i !== index));
      } else {
        setSelected([...selected, index]); 
      }
    }  

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            closeModal();
            showMessage('error', 'Group created successfully!');
            console.log("Selected contacts:", selected);
        }, 4000); 
    }

    return (
        <Container>
            <h1>Create Group</h1>
            <input type="text" placeholder="Type group name" />
            <ul>
                {contacts.map((contact, index) => (
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
                {isLoading ? "Creating..." : "Create"}
            </button>
        </Container>
    );
}

export default Create;