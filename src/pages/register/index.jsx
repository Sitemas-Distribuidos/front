/* ⚛ REACT */
import { useRef, useState, useContext } from "react";

/* 📦 LIBS */
import { useNavigate } from "react-router";

/* 🧠 CONTEXT */
import { MessageContext } from '../../context/MessageContext';

/* 📁 ASSETS*/
import { register } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, Link, RegisterIcon } from "./styles";

const Register = () => {

    document.title = "Register";

    let navigate = useNavigate();

    const { showMessage } = useContext(MessageContext);

    const usernameRef = useRef(null);
    const useremailRef = useRef(null);
    const userpasswordRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            if (useremailRef.current.value && useremailRef.current.value && userpasswordRef.current.value) {
                console.log(usernameRef.current.value);
                navigate("/join");
                showMessage('success', 'Successfully registered user!'); 
            } else {
                showMessage('error', 'Invalid user'); 
            }
            setIsLoading(false);
        }, 2000)
    }

    return(
        <Container>
            <h1>Register</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label htmlFor="username">User Name</label>
                    <input type="text" aria-label="User Name" ref={usernameRef} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" aria-label="Email" ref={useremailRef} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" aria-label="Password" ref={userpasswordRef} />
                </div>
                <Link to="/join">Already have an account?</Link>
                <button type="submit" onClick={() => handleSubmit()}>
                    {isLoading ? 'Registering...' : 'Register'}
                    <RegisterIcon src={register} />
                </button>
            </form>
        </Container>
    );
}

export default Register;