/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

// Load environment variables from .env.development / .env.production
require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV || `development`}`,
})

// HTTP Basic auth for a password-protected WordPress backend.
//
// The `htaccess` key is just gatsby-source-wordpress's legacy name for Basic
// auth — it does not require (or read) an .htaccess file. All it does is emit a
// standard `Authorization: Basic <base64>` header, which is what WP Engine's
// nginx-based password protection expects.
//
// Only set when a password is actually configured, otherwise the plugin would
// send a literal "undefined:undefined".
const wpBasicAuth = process.env.WP_BASIC_AUTH_PASSWORD
  ? {
      htaccess: {
        username: process.env.WP_BASIC_AUTH_USER,
        password: process.env.WP_BASIC_AUTH_PASSWORD,
      },
    }
  : null

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL || `https://redirecttes521.wpenginepowered.com/graphql`,
        verbose: true,
        // Sends an `Authorization: Basic <base64>` header on GraphQL requests
        // and media downloads, for a password-protected WordPress instance.
        ...(wpBasicAuth && { auth: wpBasicAuth }),
        develop: {
          hardCacheMediaFiles: true,
        },
        type: {
          Post: {
            limit: process.env.NODE_ENV === `development` ? 50 : null,
          },
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
