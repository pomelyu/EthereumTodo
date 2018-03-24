import React from 'react'; // eslint-disable-line no-unused-vars
import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  overflow-x: ${props => (((props.direction === 'row') && props.overflow) || 'auto')};
  overflow-y: ${props => (((props.direction === 'column') && props.overflow) || 'auto')};
  
  > *:not(:first-child) {
    margin-top: ${props => ((props.direction === 'column') && props.space)};
    margin-left: ${props => ((props.direction === 'row') && props.space)};
  }
`;

export default FlexBox;

