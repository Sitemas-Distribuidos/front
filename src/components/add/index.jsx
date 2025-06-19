/* ⚛ REACT */
import { useState, useContext } from "react";

/* 🧠 CONTEXT */
import { ModalContext } from '../../context/ModalContext';
import { MessageContext } from '../../context/MessageContext';

/* 📁 ASSETS */
import { add } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, AddIcon } from "./styles";


const Add = () => {

    const { closeModal } = useContext(ModalContext);
    const { showMessage } = useContext(MessageContext);

    const [isLoading, setIsLoading] = useState(false);

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
            <input type="text" placeholder="Type contact name" />
            <button onClick={() => handleSubmit()} disabled={isLoading}>
                <AddIcon src={add} />
                {isLoading ? "Adding..." : "Add"}
            </button>
        </Container>
    );
}

export default Add;