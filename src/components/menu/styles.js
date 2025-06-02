import styled from "styled-components";
import SVG from "react-inlinesvg";
import colors from "../../utils/colors";

export const Container = styled.div` 
    background: ${colors.primary};
    display: flex;
    flex-direction: column;
    width: 260px;

    .buttons-container {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 10px;

        div {
            align-items: center;
            display: flex;
            gap: 10px;
        }
    }

    .input-container{
        align-items: flex-end;
        display: flex;
        margin: 6px 10px;

        input {
            background: ${colors.primary};
            border: none;
            border-bottom: 2px solid ${colors.secondary};
            color: ${colors.secondary};
            outline: none;
            width: 100%;
        }
    }

    ul {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        padding: 10px;
        
        li {
            border-bottom: 1px solid ${colors.secondary};
            color: ${colors.secondary};
            cursor: pointer;
            display: flex;
            gap: 10px;
            list-style: none;
            padding: 10px;
            width: 100%;    
        }
    }
`;

export const CloseIcon = styled(SVG)`  
    cursor: pointer;
    height: 24px;
    width: 24px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;

export const AddIcon = styled(SVG)` 
    background: ${colors.secondary};
    border-radius: 3px;
    cursor: pointer;
    height: 32px;
    padding: 0 10px;
    width: 42px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;

export const LogoutIcon = styled(SVG)` 
    cursor: pointer;
    height: 24px;
    width: 24px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;

export const SearchIcon = styled(SVG)`  
    border-bottom: 2px solid ${colors.secondary};
    height: 24px;
    width: 24px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;

export const ChatIcon = styled(SVG)` 
    cursor: pointer;
    height: 24px;
    width: 24px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;