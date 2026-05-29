# Gatsby WordPress Headless Site

A Gatsby site configured for headless WordPress deployment on WP Engine.

## Prerequisites

- Node.js v18
- WordPress site with the following plugins installed:
  - **WPGatsby** (from WordPress.org)
  - **WPGraphQL** (from GitHub releases)

## Setup

1. Copy `.env.example` to `.env.development` and update the WordPress GraphQL URL:
   ```bash
   cp .env.example .env.development
   ```

2. Update `WPGRAPHQL_URL` in `.env.development` with your WordPress site’s GraphQL endpoint:
   ```
   WPGRAPHQL_URL=https://your-wordpress-site.com/graphql
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start development server:
   ```bash
   npm run develop
   ```

## WP Engine Deployment

1. Push your code to GitHub, GitLab, or Bitbucket

2. Deploy using WP Engine’s Headless Platform by following their [deployment guide](https://developers.wpengine.com/docs/headless-platform/getting-started/deploy-from-existing-repo/)

3. Configure the `WPGRAPHQL_URL` environment variable in WP Engine’s dashboard to point to your production WordPress GraphQL endpoint

## Scripts

- `npm run develop` - Start development server
- `npm run build` - Build for production
- `npm start` - Serve production build on port 3000 (used by WP Engine)
- `npm run clean` - Clean Gatsby cache

## Configuration

The site is configured to use `gatsby-source-wordpress` to pull content from WordPress via GraphQL. The WordPress endpoint is configured via the `WPGRAPHQL_URL` environment variable in `gatsby-config.js`.
