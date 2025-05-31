import styled from "styled-components";
import SVG from "react-inlinesvg";
import colors from "../../utils/colors";
import clip from "../../assets/icons/clip.svg"

export const Container = styled.main`   
    align-items: center;
    background: ${colors.secondary};
    box-shadow: 5px 5px 17px 1px rgba(0, 0, 0, 0.3);
    color: #000;
    display: flex;
    flex-direction: column;
    height: 600px;
    justify-content: center;
    padding: 20px;
    width: 400px;

    -webkit-box-shadow: 5px 5px 17px 1px rgba(0, 0, 0, 0.3);

    .chat {
        display: flex;
        flex-direction: column;
        height: 550px;
        width: 100%;
        
        .message-container {
            align-self: start;
            background-color: lightgrey;
            border-radius: 7px;
            margin-top: 10px;
            max-width: 250px;
            padding: 5px 10px;
            width: fit-content;
        }

        .message-mine{
            align-self: end;
            background-color: skyblue;
        }
    }

    .input-container {
        align-items: center;
        display: flex;
        width: 100%;

        input {
            background-color: ${colors.secondary};
            /* background-image: url(${clip});
            background-position: left;
            background-repeat: no-repeat;
            background-size: 20px; */
            border: none;
            border-bottom: 2px solid ${colors.primary};
            color: ${colors.primary};
            outline: none;
            width: 100%;
        }

        button {
            align-items: center;
            background: transparent;
            border: none;
            border-radius: 5px;
            color: #000;
            cursor: pointer;
            display: flex;
            outline: none;
        }
    }
`;

export const SendIcon = styled(SVG)`   
    height: 24px;
    margin-left: 10px;
    width: 24px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;