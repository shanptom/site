import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import meImg from '../../images/me.jpg'; // <-- IMPORT AT THE TOP!

const StyledAboutSection = styled.section`
  /* your existing styled-components */
`;
const StyledText = styled.div`
  /* your existing styled-components */
`;
const StyledPic = styled.div`
  /* your existing styled-components */
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'NGS:Illumina,Nanopore',
    'Metabarcoding:eDNA,aDNA',
    'R:NGS data analysis',
    'HPC:SLURM Workflows',
    'Nextflow:Reproducible Workflows',
    'Git',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>{/* Your paragraphs */}</div>

          <ul className="skills-list">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src={meImg}
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
