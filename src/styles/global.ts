import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
 
 *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}
body {
    background-color: #fff;
    color: #2f3459;
    -webkit-font-smoothing: antialiased;
    font-family: "Montserrat", sans-serif;
}

:root {
    --color-primary: #286A96;
    --color-secondary: #1B2430;
    --color-text: #5E5E5E;
    --color-accent: #61CE70;
}

`;
export default GlobalStyles;
