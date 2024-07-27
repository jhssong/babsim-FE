/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';

const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    background-color: #f5f5f5;
  }
  body {
    max-width: 500px;
    background-color: #ffffff;
    margin: 0 auto;
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
