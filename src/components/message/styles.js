import styled, { keyframes } from "styled-components";
import SVG from "react-inlinesvg";
import { colors } from "../../utils/colors";

const fadeInDown = keyframes` 
  from {
    opacity: 0;
    transform: translateY(-20px); /* sobe */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* posição normal */
  }
`

export const Container = styled.div`
    align-items: center;
    animation: ${fadeInDown} 0.3s ease;
    background: ${colors.primary};
    border-radius: 8px;
    display: flex;
    gap: 20px;
    padding: 12px 20px;
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 9999;

    span {
        color: ${colors.secondary};
    }
`

export const MessageIcon = styled(SVG)` 
    height: 28px;
    width: 28px;

    & path {
        fill: ${colors.secondary};
    }
`;