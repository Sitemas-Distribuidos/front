/* ⚛ REACT */
import { useEffect, useContext } from "react";

/* 🧠 CONTEXT */
import { MessageContext } from '../../context/MessageContext';


/* 📁 ASSETS */
import { error, success, warning } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, MessageIcon} from "./styles";

const Message = () => {
    const { message, hideMessage } = useContext(MessageContext);

    const iconMap = {
        warning: warning,
        error: error,
        success: success,
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            hideMessage();
        }, 3000);

        return () => clearTimeout(timer);
    }, [hideMessage]);

    if (!message.isShowingUp) return null;

    return(
        <Container>
            <MessageIcon src={iconMap[message.type]}/>
            <span>{message.content}</span>
        </Container>
    );
}

export default Message;