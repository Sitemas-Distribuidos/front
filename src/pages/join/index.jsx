/* ⚛ REACT */
import { useRef, useState, useContext } from "react";

/* 📦 LIBS */
import { useNavigate } from "react-router";

/* 🧠 CONTEXT */
import { MessageContext } from '../../context/MessageContext';

/* 📁 ASSETS*/
import { login } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, Link, LoginIcon } from "./styles";

const Join = () => {

    document.title = "Join";

    let navigate = useNavigate();

    const { showMessage } = useContext(MessageContext);

    const usernameRef = useRef(null);
    const userpasswordRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            if (usernameRef.current.value && userpasswordRef.current.value) {
                console.log(usernameRef.current.value);
                navigate("/");
                showMessage('success', 'Successfully login!'); 
            } else {
               showMessage('error', 'Invalid user'); 
            }
            setIsLoading(false);
        }, 2000)
    }


    return(
        <Container>
            <h1>Join</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label htmlFor="username">User Name</label>
                    <input type="text" ref={usernameRef} aria-label="User Name"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" ref={userpasswordRef} aria-label="Password"/>
                </div>
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