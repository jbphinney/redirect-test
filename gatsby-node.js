/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === 'build-javascript' || stage === 'build-html') {
    actions.setWebpackConfig({
      optimization: {
        minimize: stage === 'build-javascript',
      },
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}
