import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);
<meta name="google-site-verification" content="OYO4IXBB5_lXdIVApijJ2-w2BzeqXVWqNk0567PJqtY" />
  const one = <h1>Hi, I am </h1>;
  const two = <h2 className="big-heading">Shan Thomas.</h2>;
  const three = (
    <h3 className="big-heading" style={{ fontSize: '1.8rem' }}>
      Molecular Biologist | NGS Expert | Microbial Ecologist
    </h3>
  );
  const four = (
    <>
      <p>
        I’m fascinated by the world of microbes.
        <br />
        Alter egos:{' '}
        <em>
          {' '}
          NGS Pro | Data-Analysis Enthusiast | HPC Denizen | Molecular-Diagnostics Specialist |
          Technical-Sales Strategist.
        </em>
        <br />
        Currently a Research Assistant on{' '}
        <a href="https://compass.pnnl.gov/" target="_blank" rel="noreferrer">
          the COMPASS DOE Project
        </a>
        .
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://scholar.google.com/citations?user=9EsIZrgAAAAJ&hl=en&authuser=1"
      target="_blank"
      rel="noreferrer">
      Check out my Research!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
