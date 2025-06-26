/* ⚛ REACT */
import { useRef, useState } from "react";

/* 📦 LIBS */
import { useNavigate } from "react-router";

/* 📁 ASSETS*/
import { register } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, Link, RegisterIcon } from "./styles";

const Register = () => {

    document.title = "Register";

    let navigate = useNavigate();

    const usernameRef = useRef(null);
    const useremailRef = useRef(null);
    const userpasswordRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log(usernameRef.current.value);
            setIsLoading(false);
            navigate("/join");
        }, 6000)
        // const username = usernameRef.current.value;
        // username && setChatVisibility(true);
    }

    return(
        <Container>
            <h1>Register</h1>
            <form>
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
            </form>
            <button onClick={() => handleSubmit()}>
                {isLoading ? 'Registering...' : 'Register'}
                <RegisterIcon src={register} />
            </button>
        </Container>
    );
}

export default Register;