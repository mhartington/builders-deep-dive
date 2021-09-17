module.exports = {
  pathPrefix: '/builders-deep-dive',
  plugins: [
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-theme-mdx-deck',
      options: {
        basePath: '',
      },
    },
  ],
};
