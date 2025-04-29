import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledPostContainer = styled.main`
  max-width: 1000px;
`;

const StyledPostHeader = styled.header`
  margin-bottom: 50px;
  .tag {
    margin-right: 10px;
  }
`;

const StyledPostContent = styled.div`
  margin-bottom: 100px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
  }

  p {
    margin: 1em 0;
    line-height: 1.5;
    color: var(--light-slate);
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  code {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    padding: 0.2em 0.4em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }
`;

const ErrorMessage = styled.div`
  padding: 2rem;
  background: var(--light-navy);
  border-radius: var(--border-radius);
  text-align: center;
  margin-top: 2rem;
`;

const PostTemplate = ({ data, location }) => {
  // Defensive checks for missing data
  if (!data?.markdownRemark) {
    return (
      <Layout location={location}>
        <StyledPostContainer>
          <ErrorMessage>
            <h1>Post Not Found</h1>
            <p>The requested post could not be loaded.</p>
            <Link to="/pensieve">Back to all posts</Link>
          </ErrorMessage>
        </StyledPostContainer>
      </Layout>
    );
  }

  const { frontmatter, html } = data.markdownRemark;

  if (!frontmatter || !html) {
    return (
      <Layout location={location}>
        <StyledPostContainer>
          <ErrorMessage>
            <h1>Incomplete Post Data</h1>
            <p>This post is missing required information.</p>
            <Link to="/pensieve">Back to all posts</Link>
          </ErrorMessage>
        </StyledPostContainer>
      </Layout>
    );
  }

  const { title = 'Untitled Post', date = new Date().toISOString(), tags = [] } = frontmatter;

  return (
    <Layout location={location}>
      <Helmet title={title} />
      <StyledPostContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/pensieve">All memories</Link>
        </span>

        <StyledPostHeader>
          <h1 className="medium-heading">{title}</h1>
          <p className="subtitle">
            <time>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {tags.length > 0 && (
              <>
                <span>&nbsp;&mdash;&nbsp;</span>
                {tags.map((tag, i) => (
                  <Link key={i} to={`/pensieve/tags/${kebabCase(tag)}/`} className="tag">
                    #{tag}
                  </Link>
                ))}
              </>
            )}
          </p>
        </StyledPostHeader>

        <StyledPostContent dangerouslySetInnerHTML={{ __html: html }} />
      </StyledPostContainer>
    </Layout>
  );
};

// Make sure to include the default export
export default PostTemplate;

PostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string,
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        slug: PropTypes.string,
        description: PropTypes.string,
      }),
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date
        slug
        tags
      }
    }
  }
`;
