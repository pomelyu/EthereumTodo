import React from 'react'; // eslint-disable-line no-unused-vars
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  background: #d2edf4;
  background-image: linear-gradient(to bottom, #d0edf5, #e1e5f0 100%);
  padding: 20px 15px 15px 15px;
  position: relative;

  > *:not(:first-child) {
    margin-top: 10px;
  }
`;

export default Header;
