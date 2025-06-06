import styled from "styled-components";
import SVG from "react-inlinesvg";
import { colors } from "../../utils/colors";

export const Container = styled.main`   
    align-items: center;
    background: ${colors.secondary};
    box-shadow: 5px 5px 17px 1px rgba(0, 0, 0, 0.3);
    color: #000;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 200px;
    justify-content: center;
    width: 400px;

    -webkit-box-shadow: 5px 5px 17px 1px rgba(0, 0, 0, 0.3);

    h1 {
        color: ${colors.primary};
    }

    input {
        background: ${colors.secondary};
        border: none;
        border-bottom: 2px solid ${colors.primary};
        color: ${colors.primary};
        outline: none;
        padding-bottom: 6px;
    }

    button {
        align-items: center;
        background: ${colors.primary};
        border: none;
        border-radius: 5px;
        color: #000;
        cursor: pointer;
        display: flex;
        outline: none;
        padding: 6px 18px;
    }
`;

export const LoginIcon = styled(SVG)`   
    height: 16px;
    margin-left: 10px;
    width: 16px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;