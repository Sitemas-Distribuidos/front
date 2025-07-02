/* ⚛ REACT */
import { useContext } from "react";

/* 🧠 CONTEXT */
import { MessageContext } from '../../context/MessageContext';

/* 📁 ASSETS*/
import { trash } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, ButtonIcon } from "./styles";

const Dropdown = ({ onClick, onClose }) => {

    const { showMessage } = useContext(MessageContext);

    const handleRemove = () => {
        onClick();
        onClose(); 
        showMessage('success', 'Chat removed successfully!');
    }

    return (
        <Container>
            <button onClick={() => handleRemove()}> 
                <ButtonIcon src={trash} alt="Remove Icon"/>
                Remover
            </button>
        </Container>
    )
}

export default Dropdown;