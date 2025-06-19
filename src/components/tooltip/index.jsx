/* 🎨 STYLES */
import { Container } from "./styles";

const Tooltip = ({ chatId }) => {
    const handleRemove = () => {
        console.log(`Removing chat with ID: ${chatId}`);
    }

    return (
        <Container>
            <button onClick={() => handleRemove()}>remover</button>
            <button>adicionar</button>
        </Container>
    )
}

export default Tooltip;