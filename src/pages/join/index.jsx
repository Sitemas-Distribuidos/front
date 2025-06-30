/* ⚛ REACT */
import { useRef, useState, useContext, useEffect } from "react";

/* 📦 LIBS */
import { useNavigate } from "react-router";

/* 🔗 SERVICE */
import { useSocket } from '../../hooks/useSocket';

/* 🧠 CONTEXT */
import { MessageContext } from '../../context/MessageContext';

/* 📁 ASSETS*/
import { login } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, Link, LoginIcon } from "./styles";

/* 🔧 UTILS */
import { validateUsername } from '../../utils/validation';

const Join = () => {

    document.title = "Join";

    let navigate = useNavigate();

    const { showMessage } = useContext(MessageContext);

    const { sendMessage, socketData } = useSocket();

    const usernameRef = useRef(null);
    // const passwordRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (validateUsername(usernameRef.current.value)) {
            sendMessage(JSON.stringify({
                channel: "user",
                method: "GET",
                username: usernameRef.current.value,
            }));
        } else {
            showMessage('error', 'Invalid user'); 
        }
        setIsLoading(false);
        
    }

    const handleLogin = (response) => {
        if (response?.message.toLowerCase() === "username founded") {
            localStorage.setItem('user_id', response._id);
            navigate("/");
            showMessage('success', 'Successfully login!'); 
        }
    }

    useEffect(() => {
        if (socketData) {
            handleLogin(socketData);
        }
    }, [socketData]);

    return(
        <Container>
            <h1>Join</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label htmlFor="username">User Name</label>
                    <input type="text" ref={usernameRef} aria-label="User Name"/>
                </div>
                {/* <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" ref={userpasswordRef} aria-label="Password"/>
                </div> */}
                <Link to="/register">Create account</Link>    
                <button type="submit">
                    {isLoading ? 'Entering...' : 'Enter'}
                    <LoginIcon src={login} />
                </button>
            </form>
        </Container>
    );
}

export default Join;