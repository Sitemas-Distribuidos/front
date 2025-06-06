/* 📁 ASSETS */
import { add } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, AddIcon } from "./styles";


const Add = () => {
    return (
        <Container>
            <h1>Add Contact</h1>
            <input type="text" placeholder="Type contact name" />
            <button>
                <AddIcon src={add} />
                Add
            </button>
        </Container>
    );
}

export default Add;