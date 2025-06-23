/* ⚛ REACT */
import { useRef, useState } from "react";

/* 📦 LIBS */
import { useNavigate } from "react-router";

/* 📁 ASSETS*/
import { login } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, Link, LoginIcon } from "./styles";

const Join = () => {

    document.title = "Join";

    let navigate = useNavigate();

    const usernameRef = useRef(null);
    const userpasswordRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log(usernameRef.current.value);
            setIsLoading(false);
            navigate("/chat");
        }, 6000)
        // const username = usernameRef.current.value;
        // username && setChatVisibility(true);
        
    }

    return(
        <Container>
            <h1>Join</h1>
            <form>
                <div>
                    <label htmlFor="username">User Name</label>
                    <input type="text" ref={usernameRef} placeholder="Type your user name" aria-label="User Name"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" ref={userpasswordRef} placeholder="Type your password" aria-label="Password"/>
                </div>
                <Link to="/register" >Create account</Link>
            </form>
            <button onClick={() => handleSubmit()}>
                {isLoading ? 'Entering...' : 'Enter'}
                <LoginIcon src={login} />
            </button>
        </Container>
    );
}

export default Join;