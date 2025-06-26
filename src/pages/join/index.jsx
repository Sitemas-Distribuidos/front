/* ⚛ REACT */
import { useRef, useState, useEffect } from "react";

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
    const [error, setError] = useState({
        username: "",
        password: ""
    })

    const handleSubmit = async () => {
        setIsLoading(true);
        setTimeout(() => {
            const username = usernameRef.current.value;
            const password = userpasswordRef.current.value;
            
            const newError = {};
            if (!username) newError.username = "Campo obrigatório";
            if (!password) newError.password = "Campo obrigatório";

            if (Object.keys(newError).length > 0) {
                setError(prev => ({ ...prev, ...newError }));
                setIsLoading(false);
                return;
            }

            navigate("/");
        }, 3000)
    }


    return(
        <Container>
            <h1>Join</h1>
            <form>
                <div>
                    <label htmlFor="username">User Name</label>
                    <input type="text" ref={usernameRef} aria-label="User Name"/>
                    {error.username && <span>{error.username}</span>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" ref={userpasswordRef} aria-label="Password"/>
                    {error.password && <span>{error.password}</span>}
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