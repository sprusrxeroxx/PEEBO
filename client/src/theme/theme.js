import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    primary: '#D94E4E',    // Tomato red - energy and passion
    secondary: '#F9BC60',  // Golden yellow - comfort and satisfaction
    accent: '#4D6A6D',     // Muted teal - sophistication and balance
    light: '#FFF7EF',      // Soft ivory - clean but warm background
    dark: '#402f2f'        // Deep charcoal - text and depth
  }
};

// Update the semanticTokens to include additional tokens for color mode:

const semanticTokens = {
  colors: {
    // Existing tokens
    "bg.primary": {
      default: "brand.light",
      _dark: "gray.900",
    },
    "bg.card": {
      default: "white",
      _dark: "gray.800",
    },
    "bg.input": {
      default: "white",
      _dark: "gray.700",
    },
    "text.primary": {
      default: "brand.dark",
      _dark: "gray.100",
    },
    "text.secondary": {
      default: "gray.600",
      _dark: "gray.400",
    },
    "border.subtle": {
      default: "gray.200",
      _dark: "gray.700",
    },
    
    // New tokens for accent colors in dark mode
    "accent.primary": {
      default: "brand.primary",
      _dark: "#F56565", // Brighter red for dark mode
    },
    "accent.secondary": {
      default: "brand.secondary",
      _dark: "#FFD580", // Brighter gold for dark mode
    },
    "accent.tertiary": {
      default: "brand.accent",
      _dark: "#81A4A7", // Lighter teal for dark mode
    }
  }
};

// Typography configuration
const fonts = {
  heading: "'Montserrat', sans-serif",
  body: "'Open Sans', sans-serif",
};

const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
};

const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

const lineHeights = {
  normal: 'normal',
  none: 1,
  shorter: 1.25,
  short: 1.375,
  base: 1.5,
  tall: 1.625,
  taller: 2,
};

const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

// Focus styles for better accessibility
const shadows = {
  outline: '0 0 0 3px var(--chakra-colors-brand-secondary)',
};

// Color mode specific styles for better contrast
const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'gray.900' : 'brand.light',
      color: props.colorMode === 'dark' ? 'white' : 'brand.dark',
      fontFamily: 'body',
      lineHeight: 'base',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      fontWeight: 'bold',
      lineHeight: 'shorter',
      color: props.colorMode === 'dark' ? 'white' : 'brand.dark',
    },
    p: {
      fontFamily: 'body',
      lineHeight: 'tall',
      color: props.colorMode === 'dark' ? 'gray.200' : 'gray.700',
    },
    // Improve focus visibility
    ':focus': {
      boxShadow: 'outline',
      outline: 'none',
    },
    // Make sure links are underlined for better visibility
    a: {
      color: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
    },
    // Loader styles
    '@keyframes loaderAnim': {
      '0%': {
        backgroundSize: '100% 100%',
      },
      '100%': {
        backgroundSize: '100% 5%',
      }
    }
  }),
};

// Update the components object to handle dark mode properly

const components = {
  Heading: {
    baseStyle: (props) => ({
      fontFamily: 'heading',
      fontWeight: 'bold',
      color: props.colorMode === 'dark' ? 'gray.100' : 'brand.dark',
      letterSpacing: 'tight',
    }),
    sizes: {
      '4xl': { fontSize: '7xl', lineHeight: 'shorter' },
      '3xl': { fontSize: '6xl', lineHeight: 'shorter' },
      '2xl': { fontSize: '5xl', lineHeight: 'shorter' },
      xl: { fontSize: '4xl', lineHeight: 'shorter' },
      lg: { fontSize: '3xl', lineHeight: 'shorter' },
      md: { fontSize: '2xl', lineHeight: 'shorter' },
      sm: { fontSize: 'xl', lineHeight: 'shorter' },
      xs: { fontSize: 'lg', lineHeight: 'shorter' },
    },
  },
  Text: {
    baseStyle: (props) => ({
      fontFamily: 'body',
      lineHeight: 'tall',
      color: props.colorMode === 'dark' ? 'gray.300' : 'inherit',
    }),
    variants: {
      // For recipe descriptions
      description: (props) => ({
        fontStyle: 'italic',
        fontSize: 'md',
        color: props.colorMode === 'dark' ? 'gray.400' : 'gray.600',
        lineHeight: 'tall',
      }),
      // For recipe instructions
      instructions: (props) => ({
        fontSize: 'md',
        lineHeight: 'tall',
        color: props.colorMode === 'dark' ? 'gray.300' : 'brand.dark',
      }),
      // For ingredient lists
      ingredient: (props) => ({
        fontSize: 'sm',
        lineHeight: 'base',
        color: props.colorMode === 'dark' ? 'gray.400' : 'gray.700',
      }),
      // For card titles
      cardTitle: (props) => ({
        fontWeight: 'semibold',
        fontSize: 'lg',
        color: props.colorMode === 'dark' ? 'white' : 'brand.dark',
      }),
      // For card subtitles
      cardSubtitle: (props) => ({
        fontSize: 'sm',
        color: props.colorMode === 'dark' ? 'gray.400' : 'gray.600',
      }),
    },
  },
  Button: {
    baseStyle: {
      fontFamily: 'heading',
      fontWeight: 'medium',
      letterSpacing: 'wide',
      position: 'relative',
      transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      _focus: {
        boxShadow: 'outline',
        outline: 'none',
      },
    },
    variants: {
      primary: (props) => ({
        bg: 'brand.primary',
        color: 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? '#E56060' : '#C03C3C',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        },
        _active: {
          bg: props.colorMode === 'dark' ? '#C03C3C' : '#B53535',
          transform: 'translateY(0)',
          boxShadow: 'inner',
        },
      }),
      secondary: (props) => ({
        bg: 'brand.secondary',
        color: props.colorMode === 'dark' ? 'gray.800' : 'brand.dark',
        _hover: {
          bg: props.colorMode === 'dark' ? '#FFCB80' : '#E0A955',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        },
        _active: {
          bg: props.colorMode === 'dark' ? '#E0A955' : '#D69B45',
          transform: 'translateY(0)',
          boxShadow: 'inner',
        },
      }),
      accent: (props) => ({
        bg: 'brand.accent',
        color: 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? '#5D8082' : '#3E5658',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        },
        _active: {
          bg: props.colorMode === 'dark' ? '#3E5658' : '#334547',
          transform: 'translateY(0)',
          boxShadow: 'inner',
        },
      }),
      ghost: (props) => ({
        _hover: {
          bg: props.colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          transform: 'translateY(-1px)',
        },
        _active: {
          bg: props.colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
          transform: 'translateY(0)',
        },
      }),
      outline: (props) => ({
        borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
        _hover: {
          transform: 'translateY(-1px)',
          boxShadow: 'sm',
          bg: props.colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'transparent',
        },
        _active: {
          transform: 'translateY(0)',
          boxShadow: 'inner',
        },
      }),
    }
  },
  Card: {
    baseStyle: (props) => ({
      p: '6',
      rounded: 'lg',
      bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
      boxShadow: 'md',
      borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
      borderWidth: '1px',
    }),
  },
  Input: {
    baseStyle: (props) => ({
      field: {
        fontFamily: 'body',
        bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
        borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
      }
    }),
  },
  FormLabel: {
    baseStyle: (props) => ({
      fontFamily: 'heading',
      fontWeight: 'medium',
      fontSize: 'sm',
      color: props.colorMode === 'dark' ? 'gray.300' : 'gray.700',
    }),
  },
  Modal: {
    baseStyle: (props) => ({
      dialog: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        borderColor: props.colorMode === "dark" ? "gray.700" : "gray.200",
        boxShadow: "xl",
      },
      header: {
        fontFamily: "heading",
        fontWeight: "bold",
        fontSize: "lg",
        color: props.colorMode === "dark" ? "gray.100" : "brand.dark",
      },
      body: {
        fontFamily: "body",
      },
      footer: {
        borderTopWidth: "1px",
        borderTopColor: props.colorMode === "dark" ? "gray.700" : "gray.100",
      }
    }),
  },
  
  Drawer: {
    baseStyle: (props) => ({
      dialog: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        color: props.colorMode === "dark" ? "gray.100" : "brand.dark",
      },
      header: {
        fontFamily: "heading",
        fontWeight: "bold",
        borderBottomWidth: "1px",
        borderBottomColor: props.colorMode === "dark" ? "gray.700" : "gray.100",
      },
      body: {
        fontFamily: "body",
      },
    }),
  },
  
  Menu: {
    baseStyle: (props) => ({
      list: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        borderColor: props.colorMode === "dark" ? "gray.700" : "gray.200",
        boxShadow: "lg",
      },
      item: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        _hover: {
          bg: props.colorMode === "dark" ? "gray.700" : "gray.100",
        },
        _focus: {
          bg: props.colorMode === "dark" ? "gray.700" : "gray.100",
        },
      },
    }),
  },
  
  Badge: {
    baseStyle: (props) => ({
      fontFamily: "heading",
      fontWeight: "medium",
    }),
  },
  
  Textarea: {
    baseStyle: (props) => ({
      fontFamily: "body",
      bg: props.colorMode === "dark" ? "gray.700" : "white",
      borderColor: props.colorMode === "dark" ? "gray.600" : "gray.200",
      _hover: {
        borderColor: props.colorMode === "dark" ? "gray.500" : "gray.300",
      },
      _focus: {
        borderColor: "brand.secondary",
        boxShadow: `0 0 0 1px var(--chakra-colors-brand-secondary)`,
      },
    }),
  },
};

// Create the extended theme
const theme = extendTheme({ 
  colors, 
  semanticTokens,
  fonts, 
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  shadows,
  styles, 
  components 
});


export default theme;