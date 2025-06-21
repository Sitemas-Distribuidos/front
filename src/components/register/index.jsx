/* ⚛ REACT */
import React, { useRef, useState } from "react";

/* 📁 ASSETS*/
import { register } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, RegisterIcon } from "./styles";

const Register = () => {

    const usernameRef = useRef(null);
    const userpasswordRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log(usernameRef.current.value);
            setIsLoading(false);
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
                    <label htmlFor="password">Password</label>
                    <input type="password" aria-label="Password" ref={userpasswordRef} />
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" aria-label="Confirm Password" ref={userpasswordRef} />
                </div>
                <a href="" >Already have an account?</a>
            </form>
            <button onClick={() => handleSubmit()}>
                {isLoading ? 'Registering...' : 'Register'}
                <RegisterIcon src={register} />
            </button>
        </Container>
    );
}

export default Register;