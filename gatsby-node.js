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
