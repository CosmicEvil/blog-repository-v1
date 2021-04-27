import * as React from "react"
import {  graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Timer from '../components/Timer';


const BlogIndex = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`
   
  
      return (
        <Layout location={location} title={siteTitle}>
          <Seo title="Timer" />
        
          <Timer />

        </Layout>
      )
    
  }
  
  export default BlogIndex

  export const query = graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `