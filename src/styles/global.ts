import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

 *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}
body {
    background-color: #f8f8f8;
    color: #2f3459;
    -webkit-font-smoothing: antialiased;
    font-family: "Montserrat", sans-serif;
}

:root {
    --color-primary: #286A96;
    --color-secondary: #1B2430;
    --color-text: #5E5E5E;
    --color-accent: #61CE70;

    --screen-huge: 1440px;
    --screen-large: 1170px;
    --screen-medium: 768px;
    --scree-small: 450px;

    --toastify-font-family: 'Montserrat';
    --toastify-font-size: 0.9rem;

    --font-title-size: 1.5rem;
    --font-text-size: 1rem;
    --font-text-size-sm: 0.8rem;
    --font-text-size-md: 0.9rem;
}

`;
export default GlobalStyles;
