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
  ],
}
