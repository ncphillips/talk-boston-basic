/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

/**
 * STEP 1: Import the json hooks
 */
import { useLocalJsonForm, useGlobalJsonForm } from "gatsby-tinacms-json"

const Bio = () => {
  /**
   * STEP 2: Add the `fileRelativePath` and `rawJson` to your gatsby query
   */
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/nolan.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      author: dataJson(pk: { eq: "author" }) {
        name
        social {
          twitter
        }

        ###############
        # Tina Fields #
        ###############
        fileRelativePath
        rawJson
      }
    }
  `)

  /**
   * STEP 3: Make the author editable with `useLocalJsonForm`
   *
   * Then checkout `useGlobalJsonForm`
   */
  const { name, social } = data.author

  // const [{ name, social }] = useGlobalJsonForm(data.author, {
  //   label: "Author",
  //   fields: [{ name: "rawJson.name", label: "Name", component: "text" }],
  // })

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Written by <strong>{name}</strong> who lives and works in Canada
        building useful things.
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          You should follow him on Twitter
        </a>
      </p>
    </div>
  )
}

export default Bio
