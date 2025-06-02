/* ⚛ REACT */
import React, { useRef, useState } from "react";

/* 📁 ASSETS*/
import { login } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, LoginIcon } from "./styles";

const Join = () => {

    const usernameRef = useRef(null);

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
            <h1>Join</h1>
            <input type="text" ref={usernameRef} placeholder="Type your user name"/>
            <button onClick={() => handleSubmit()}>
                {isLoading ? 'Entering...' : 'Enter'}
                <LoginIcon src={login} fill="#000000"/>
            </button>
        </Container>
    );
}

export default Join;