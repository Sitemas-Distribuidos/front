import styled from "styled-components";
import SVG from "react-inlinesvg";

export const Container = styled.div`
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: "100%", height: "100%",
    zIndex: 1000,

    .modal-content {
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        maxWidth: "500px",
        minWidth: "300px",
        padding: "20px",
    },

`;

export const CloseIcon = styled(SVG)`
    cursor: pointer;
    float: right;
    height: 24px;
    width: 24px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;

