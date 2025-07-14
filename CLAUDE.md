# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Gatsby.js v5. It's a React-based static site generator that creates a personal website showcasing projects, experience, and blog posts. The site uses modern web technologies including styled-components for styling and includes features like a loader animation, navigation, blog ("pensieve"), and project showcase.

## Development Commands

### Core Commands
- `npm start` or `npm run develop` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Preview production build locally
- `npm run clean` - Clean Gatsby cache and public folder
- `npm run deploy` - Build and deploy to GitHub Pages

### Code Quality
- `npm run format` - Format code with Prettier
- Pre-commit hooks automatically run linting and formatting via Husky
- ESLint configuration extends `@upstatement/eslint-config/react`

## Architecture

### File Structure
- `/src/components/` - Reusable React components with index file exports
- `/src/pages/` - Gatsby page components (index.js, 404.js, archive.js, pensieve/)
- `/src/templates/` - Dynamic page templates (post.js, tag.js)
- `/src/styles/` - Global styles, theme, mixins using styled-components
- `/src/hooks/` - Custom React hooks
- `/src/utils/` - Utility functions
- `/content/` - Markdown content (posts/, projects/, featured/, jobs/)
- `/static/` - Static assets served directly

### Key Architecture Patterns

**Component Organization**: Components use a barrel export pattern via `src/components/index.js`. Main sections are modularized (Hero, About, Jobs, Featured, Contact).

**Styling**: Uses styled-components with a centralized theme system. Global styles, mixins, and theme are exported from `/src/styles/index.js`. Custom CSS properties and design tokens are defined in theme.js.

**Content Management**: Uses Gatsby's GraphQL layer with markdown files. Content is organized by type (posts, projects, featured work, jobs) with frontmatter for metadata.

**Path Aliases**: Webpack aliases are configured for clean imports:
- `@components` → `src/components`
- `@config` → `src/config`
- `@styles` → `src/styles`
- `@hooks` → `src/hooks`
- `@images` → `src/images`
- `@utils` → `src/utils`

**Animation**: Uses ScrollReveal for scroll animations and AnimeJS for loader animations. These libraries are null-loaded during SSR to prevent hydration issues.

### Content Structure
- **Posts**: Blog posts in `/content/posts/` with markdown files
- **Projects**: Project showcases in `/content/projects/` as markdown files
- **Featured**: Selected work highlighted on homepage in `/content/featured/`
- **Jobs**: Work experience in `/content/jobs/`

All content uses frontmatter for metadata and supports images, tags, and custom fields.

### Page Generation
- Dynamic pages created via `gatsby-node.js` for blog posts and tag pages
- Uses lodash for slug generation and GraphQL queries for content aggregation
- Post permalinks use frontmatter slug field
- Tag pages generated at `/pensieve/tags/{tag-name}/`

### Configuration
- Site config centralized in `/src/config.js` with email, social media links, navigation, colors, and ScrollReveal settings
- Gatsby config includes plugins for images, PWA features, analytics, and markdown processing
- Supports PrismJS for syntax highlighting in blog posts

## Development Notes

### Styling Approach
The site uses a design system with consistent spacing, typography, and color scheme. The navy/green color palette is defined in the config and theme files. All components should follow the established design patterns and use theme values rather than hardcoded styles.

### Content Guidelines
When adding new content, follow the existing frontmatter structure. Blog posts require date, title, description, tags, and slug fields. Projects should include title, description, tech stack, and links.

### Performance Considerations
The site is optimized for performance with image optimization, code splitting, and PWA features. The loader animation prevents layout shift on initial load. External link handling is automated to add proper security attributes.