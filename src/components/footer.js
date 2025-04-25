import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  padding: 20px;
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  color: var(--light-slate);
`;

const Footer = () => (
  <StyledFooter>
      Website design adapted from{' '}
    <a href="https://github.com/bchiang7/v4" target="_blank" rel="noopener noreferrer">
        Brittany Chiang's GitHub
    </a>
  </StyledFooter>
);

export default Footer;
