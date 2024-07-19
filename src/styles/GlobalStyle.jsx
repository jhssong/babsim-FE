/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

const globalStyles = css`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body {
        max-width: 750px;
        margin-left: auto;
        margin-right: auto;
        background-color: #ffffff;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    .clickable {
        cursor: pointer;
    }
`;

const GlobalStyle = () => <Global styles={globalStyles} />;

export default GlobalStyle;
