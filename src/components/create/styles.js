import styled from "styled-components";
import SVG from "react-inlinesvg";
import { colors } from "../../utils/colors";

export const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 36px;

    h1 {
        font-size: 24px;
        font-weight: 600;
        color: #403D39;
    }

    input {
        border: none;
        border-bottom: 2px solid ${colors.secondary};
        outline: none;
        padding: 0 10px;
        width: 100%;
    }

    ul {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        height: 220px;
        overflow: auto;
        padding: 0 10px;
        scrollbar-width: thin;
        width: 100%;

        li {
            align-items: center;
            border-bottom: 1px solid ${colors.secondary};
            color: ${colors.secondary};
            cursor: pointer;
            display: flex;
            gap: 10px;
            list-style: none;
            padding: 10px;
            width: 100%;    

            .contact-info {
                align-items: center;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
            }
        }
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

export const PersonIcon = styled(SVG)` 
    cursor: pointer;
    height: 34px;
    width: 34px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;

export const AddOrRemoveIcon = styled(SVG)` 
    height: 28px;
    width: 28px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;

export const AddIcon = styled(SVG)` 
    height: 28px;
    width: 28px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;

