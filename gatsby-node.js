/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // Query for all WordPress pages
  const result = await graphql(`
    {
      allWpPage {
        edges {
          node {
            id
            uri
            title
            content
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.error(result.errors)
    throw new Error('Error fetching WordPress pages')
  }

  // Create pages for each WordPress page
  const pageTemplate = path.resolve('./src/templates/page.js')

  result.data.allWpPage.edges.forEach(({ node }) => {
    createPage({
      path: node.uri,
      component: pageTemplate,
      context: {
        id: node.id,
      },
    })
  })

  // Create redirect
  createRedirect({
    fromPath: '/redirect-test-one/',
    toPath: '/redirect-test-two/',
    isPermanent: true,
    redirectInBrowser: true,
    statusCode: 301,
  })
}
