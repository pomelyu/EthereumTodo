import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    background-color: #315481;
    background-image: linear-gradient(to bottom, #315481, #918e82 100%);
    background-attachment: fixed;
  
    padding: 0;
    margin: 0;

    width: 100vw;
    height: 100vh;
  }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
`;