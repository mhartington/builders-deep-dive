const theme = {
  googleFont:
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200;500;600&display=swap',
  fontWeights: {
    body: 500,
    heading: 600,
    bold: 600,
  },
  fonts: {
    body: "'JetBrains Mono', system-ui, sans-serif",
    monospace: "'JetBrains Mono'",
  },
  components: {},

  colors: {
    primary: '#6699cc',
    heading: '#060B0A',
    text: '#5A6984',
    vue: '#9FB0CF',
    ionic: '#bfe4ff',
  },
  styles: {
    Slide: {
      fontFamily: 'body',
    },
    Split: {
      textAlign: 'right',
    },
    h1: {
      margin: '0 0 10px',
      color: 'heading',
    },
    h2: {
      margin: '0 0 10px',
      color: 'heading',
    },
    h3: {
      margin: '0 0 10px',
      color: 'heading',
    },
    h4: {
      margin: '0 0 10px',
      color: 'heading',
    },
    h5: {
      margin: '0 0 10px',
      color: 'heading',
    },
    h6: {
      margin: '0 0 10px',
      color: 'heading',
    },
    p: {
      margin: '10px 0 ',
    },
    a: {
      textDecoration: 'none',
      transition: 'color 0.15s ease',
      ':hover': {
        color: '#96B3F9',
      },
    },
    blockquote: {
      fontStyle: 'italic',
    },
    ul: {
      listStyle: 'none',
      paddingInlineStart: 0,
      textAlign: 'left',
    },
    li: {
      lineHeight: 2.2,
      textAlign: 'left',
    },
    img: {
      maxWidth: '100%',
    },
    root: {
      '.profile-img': {
        width: '250px',
        borderRadius: '50%',
        border: 'solid 2px rgba(217,217,217,0.7)',
      },
    },
  },
};

export default {
  ...theme,
};
