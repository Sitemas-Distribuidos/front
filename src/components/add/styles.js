import styled from "styled-components";
import SVG from "react-inlinesvg";
import { colors } from "../../utils/colors";

export const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 40px;

    h1 {
        font-size: 24px;
        font-weight: 600;
        color: #403D39;
    }

    input {
        border: none;
        border-bottom: 2px solid ${colors.secondary};
        outline: none;
        padding: 10px;
        width: 100%;
    }

    button {
        align-items: center;
        background: #403D39;
        border: none;
        color: #FFF;
        cursor: pointer;
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 10px;
        width: 100%;
    }
`;

export const AddIcon = styled(SVG)` 
    height: 28px;
    width: 28px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;