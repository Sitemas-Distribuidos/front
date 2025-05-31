import styled from "styled-components";
import colors from "../../utils/colors";

export const Container = styled.main`   
    align-items: center;
    /* background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%); */
    background: ${colors.tertiary};
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100%;
`;