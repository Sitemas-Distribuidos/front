import styled from "styled-components";
import SVG from "react-inlinesvg";
import { colors } from "../../utils/colors";

export const Container = styled.div`

`;

export const AddIcon = styled(SVG)` 
    cursor: pointer;
    height: 28px;
    width: 28px;

    & path {
        fill: ${({ fill }) => fill};
    }
`;