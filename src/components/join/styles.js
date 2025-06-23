import styled from "styled-components";
import SVG from "react-inlinesvg";
import { colors } from "../../utils/colors";
import { Link as CustomLink } from "react-router";


export const Container = styled.main`   
    align-items: center;
    background: ${colors.secondary};
    box-shadow: 5px 5px 17px 1px rgba(0, 0, 0, 0.3);
    color: #000;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 320px;
    justify-content: center;
    width: 400px;

    -webkit-box-shadow: 5px 5px 17px 1px rgba(0, 0, 0, 0.3);

    h1 {
        color: ${colors.primary};
    }

    form {
        align-items: center;    
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        width: 100%;

        div {
            display: flex;
            flex-direction: column;
            label {
                color: ${colors.primary};
                font-size: 14px;
                font-weight: 500;
                margin-bottom: 4px;
            }
            
            input {
                background: ${colors.secondary};
                border: none;
                border-bottom: 2px solid ${colors.primary};
                color: ${colors.primary};
                outline: none;
                padding-bottom: 6px;
            }
        }
    }

    button {
        align-items: center;
        background: ${colors.primary};
        border: none;
        border-radius: 5px;
        color: ${colors.secondary};
        cursor: pointer;
        display: flex;
        outline: none;
        padding: 6px 18px;
    }
`;

export const Link = styled(CustomLink)`   
    color: ${colors.primary};
    font-size: 14px;
    
    &:visited {
        color: #CCC5B9;
    }
`;

export const LoginIcon = styled(SVG)`   
    height: 18px;
    margin-left: 10px;
    width: 18px;

    & path {
        fill: ${colors.secondary};
    }
`;