/* 🧩 COMPONENTS */
import Chat from "../../components/chat";
import Join from "../../components/join";
import Modal from "../../components/modal";
import Message from "../../components/message";

/* 🧠 CONTEXT */
import { ModalProvider } from "../../context/ModalContext";
import { MessageProvider } from "../../context/MessageContext";

/* 🎨 STYLES */
import { Container } from "./styles";


const Home = () => {
    document.title = "Chat";

    return ( 
        <MessageProvider>
            <ModalProvider>
                <Container>
                    <Message />
                    {/* <Join/> */}
                    <Chat />
                    <Modal />
                </Container>
            </ModalProvider>
        </MessageProvider>
     );
}
 
export default Home;
