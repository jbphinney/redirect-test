import * as React from "react"
import { navigate } from "gatsby"

const RedirectTemplate = ({ pageContext }) => {
  React.useEffect(() => {
    navigate(pageContext.redirectTo, { replace: true })
  }, [pageContext.redirectTo])

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  )
}

export const Head = ({ pageContext }) => (
  <>
    <meta httpEquiv="refresh" content={`0;url=${pageContext.redirectTo}`} />
  </>
)

export default RedirectTemplate
