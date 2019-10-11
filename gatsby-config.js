/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `David Wesst`,
    subtitle: `The Official Site for all things Wessty`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Raleway'
          },
          {
            family: 'Open Sans'
          }
        ]
      }
    },
    {
      resolve: `gatsby-transformer-json`
    },
    { 
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/data/'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/content/blog`
      }
    },
    `gatsby-transformer-remark`
  ]
}
