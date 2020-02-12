
export default {
  fontWeights: {
    body: 300,
    heading: 100,
    bold: 500
  },
  colors: {
    background: '#1B2B34',
    text: '#fff',
    primary: '#6699cc',
    base00: '#1b2b34',
    base01: '#343d46',
    base02: '#4f5b66',
    base03: '#65737e',
    base04: '#a7adba',
    base05: '#c0c5ce',
    base06: '#cdd3de',
    base07: '#d8dee9',
    base08: '#ec5f67',
    base09: '#f99157',
    base0A: '#fac863',
    base0B: '#99c794',
    base0C: '#62b3b2',
    base0D: '#6699cc',
    base0E: '#c594c5',
    base0F: '#ab7967',
    base10: '#ffffff'
  },
  styles: {
    Slide: {
      fontFamily: 'body',
      fontSize: [4, 5, 6, 7],
    },
    h1: {
      margin: '0 0 10px'
    },
    h2: {
      margin: '0 0 10px'
    },
    h3: {
      margin: '0 0 10px'
    },
    h4: {
      margin: '0 0 10px'
    },
    h5: {
      margin: '0 0 10px'
    },
    h6: {
      margin: '0 0 10px'
    },
    p: {
      margin: '10px 0 ',
      textAlign: 'center'
    },
    a: {
      color: 'base10',
      textDecoration: 'none',
      transition: "color 0.15s ease",
      ':hover': {
        color: 'base0D'
      },
      '::after': {
        content: '""',
        display: 'block',
        width: '100%',
        height: 2,
        backgroundColor: 'base0D',
        opacity: 0,
        transform: 'translate3D(0,10px, 0)',
        transition: 'opacity 0.3s, transform 0.3s',
      },
      ':hover::after': {
        opacity: 1,
        transform: 'translate3D(0,0,0)',
      }
    },
    ul: {
      listStyle: 'none',
      paddingInlineStart: 0
    },
    li: {
      textAlign: 'center',
      margin: '10px 0 '
    },
    CodeSurfer: {
      pre: {
        color: 'base10',
        backgroundColor: 'base00'
      },
      code: {
        color: 'base10',
        backgroundColor: 'base00'
      },
      tokens: {
        'comment prolog cdata': {
          color: 'base03' /* base03 */
        },

        'entity string': {
          color: 'base04' /* base04 */
        },

        punctuation: {
          color: 'base05' /* base05 */
        },

        'variable tag operator deleted ': {
          color: 'base08' /* base08 */
        },

        'property number boolean constant url': {
          color: 'base0A' /* base09 */
        },
        'maybe-class-name': {
          color: 'base0C',
          fontStyle: 'italic'
        },

        'class-name bold': {
          color: 'base0A' /* base0A */
        },

        'string symbol attr-value inserted atrule': {
          color: 'base0B' /* base0B */
        },

        'regex important': {
          color: 'base0C' /* base0C */
        },

        'function attr-name': {
          color: 'base0D' /* base0D */
        },

        'keyword selector italic char builtin': {
          color: 'base0E' /* base0E */
        },

        doctype: {
          color: 'base0F' /* base0F */
        },

        'important bold': {
          fontWeight: 'bold'
        },
        italic: {
          fontStyle: 'italic'
        }
      },
      title: {
        backgroundColor: 'base00',
        color: 'base10'
      },
      subtitle: {
        backgroundColor: 'base00',
        color: 'base10'
      },
      unfocused: {
        opacity: 0.1,
      }
    }
  }
};
