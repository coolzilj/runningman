import React, { useState } from "react"

import SEO from "../components/seo"
import { graphql } from "gatsby"
import "../css/global.css"

export const results = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allEpisodesJson {
      edges {
        node {
          id
          title
          published_at
          guests
          srcs
        }
      }
    }
  }
`

function generatePlayerUrl(src) {
  let aid = ""
  let page = "1"

  const aidMatch = src.match(/https:\/\/www\.bilibili\.com\/video\/av(\d+)/i)
  if (aidMatch) {
    aid = aidMatch[1]
  }

  const pageMatch = src.match(/\?p=(\d+)$/i)
  if (pageMatch) {
    page = pageMatch[1]
  }

  return `//player.bilibili.com/player.html?aid=${aid}&page=${page}&high_quality=1`
}

const IndexPage = ({ data }) => {
  const initUrl = generatePlayerUrl(data.allEpisodesJson.edges[0].node.srcs[0])
  const [url, setUrl] = useState(initUrl)

  const episodes = data.allEpisodesJson.edges.map(edge => {
    const ep = edge.node
    return (
      <div key={ep.id} className="p-4 m-4 bg-white rounded-lg shadow-md">
        <h4 className="text-lg text-gray-900 leading-tight">
          <span className="rounded px-1 bg-gray-500 text-white text-sm leading-tight">
            E{ep.id}
          </span>{" "}
          {ep.title}
        </h4>
        <p className="mb-2 text-sm text-gray-600 leading-normal">
          {ep.published_at}
        </p>
        <div className="block mb-2">
          {ep.guests.map((guest, i) => {
            return (
              <span key={i} className="text-sm text-gray-800 border-b mr-2">
                {guest}
              </span>
            )
          })}
        </div>
        <div className="block">
          {ep.srcs.map((src, i) => {
            return (
              <button
                key={i}
                onClick={() => setUrl(generatePlayerUrl(src))}
                className="mr-2 text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded px-4 py-1 leading-normal"
              >
                源{i + 1}
              </button>
            )
          })}
        </div>
      </div>
    )
  })

  return (
    <div>
      <SEO title="Home" />
      <div className="lg:fixed lg:inset-y-0 lg:left-0 lg:right-400 h-screen">
        <iframe
          title="Player"
          src={url}
          scrolling="no"
          border="0"
          frameBorder="no"
          framespacing="0"
          allowFullScreen={true}
          width="100%"
          height="100%"
        />
      </div>
      <div className="lg:fixed lg:w-400 lg:right-0 lg:inset-y-0 lg:overflow-y-scroll	">
        <div className="p-6 text-gray-900 text-xl font-bold text-center">
          {data.site.siteMetadata.title}
          <br/>
          2013-2016
        </div>
        {episodes}
      </div>
    </div>
  )
}

export default IndexPage
