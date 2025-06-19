import Chat from "../../components/chat";
import Join from "../../components/join";
import { Container } from "./styles";

const Home = () => {
    document.title = "Chat"

    return ( 
        <Container>
            {/* <Join/> */}
            <Chat />
        </Container>
     );
}
 
export default Home;