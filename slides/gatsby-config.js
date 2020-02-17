module.exports = {
  pathPrefix: '/ng-conf-2020',
  plugins: [
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-theme-mdx-deck',
      options: {
        basePath: ''
      }
    }
  ]
};
