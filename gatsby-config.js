module.exports = {
  siteMetadata: {
    title: `SBS Running Man 补全计划`,
    description: `SBS Running Man 补全计划`,
    author: `Jin Liu`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-baidu-analytics`,
      options: {
        siteId: "035e1673c7cfcf1a6535c1baef1035cc",
        head: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-33100535-1",
      },
    },
  ],
}
