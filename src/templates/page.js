import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PageTemplate = ({ data }) => {
  const page = data.wpPage

  return (
    <Layout>
      <article>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>
    </Layout>
  )
}

export const Head = ({ data }) => <Seo title={data.wpPage.title} />

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      title
      content
    }
  }
`

export default PageTemplate
