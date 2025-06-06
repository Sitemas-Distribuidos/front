/* 🧩 COMPONENTS */
import Chat from "../../components/chat";
import Join from "../../components/join";
import Modal from "../../components/modal";


import { ModalProvider } from "../../context/ModalContext";

/* 🎨 STYLES */
import { Container } from "./styles";

const Home = () => {
    document.title = "Chat";

    return ( 
        <ModalProvider>
            <Container>
                {/* <Join/> */}
                <Chat />
                <Modal>
                    <h2>Esse é o conteúdo do modal!</h2>
                    {/* <h2>Esse é o conteúdo do modal!</h2>
                    <p>Você pode colocar qualquer coisa aqui.</p> */}
                </Modal>
            </Container>
        </ModalProvider>
     );
}
 
export default Home;