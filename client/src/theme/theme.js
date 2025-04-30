import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    primary: '#D94E4E',    // Tomato red - energy and passion
    secondary: '#F9BC60',  // Golden yellow - comfort and satisfaction
    accent: '#4D6A6D',     // Muted teal - sophistication and balance
    light: '#FFF7EF',      // Soft ivory - clean but warm background
    dark: '#3D3131'        // Deep charcoal - text and depth
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
    }
  }),
};

const components = {
  Heading: {
    baseStyle: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      color: 'brand.dark',
      letterSpacing: 'tight',
    },
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
    baseStyle: {
      fontFamily: 'body',
      lineHeight: 'tall',
    },
    variants: {
      // For recipe descriptions
      description: {
        fontStyle: 'italic',
        fontSize: 'md',
        color: 'gray.600',
        lineHeight: 'tall',
      },
      // For recipe instructions
      instructions: {
        fontSize: 'md',
        lineHeight: 'tall',
        color: 'brand.dark',
      },
      // For ingredient lists
      ingredient: {
        fontSize: 'sm',
        lineHeight: 'base',
        color: 'gray.700',
      },
      // For card titles
      cardTitle: {
        fontWeight: 'semibold',
        fontSize: 'lg',
        color: 'brand.dark',
      },
      // For card subtitles
      cardSubtitle: {
        fontSize: 'sm',
        color: 'gray.600',
      },
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
      primary: {
        bg: 'brand.primary',
        color: 'white',
        _hover: {
          bg: '#C03C3C',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        },
        _active: {
          bg: '#B53535',
          transform: 'translateY(0)',
          boxShadow: 'inner',
        },
      },
      secondary: {
        bg: 'brand.secondary',
        color: 'brand.dark',
        _hover: {
          bg: '#E0A955',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        },
        _active: {
          bg: '#D69B45',
          transform: 'translateY(0)',
          boxShadow: 'inner',
        },
      },
      accent: {
        bg: 'brand.accent',
        color: 'white',
        _hover: {
          bg: '#3E5658',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        },
        _active: {
          bg: '#334547',
          transform: 'translateY(0)',
          boxShadow: 'inner',
        },
      },
      ghost: {
        _hover: {
          bg: 'rgba(0,0,0,0.05)',
          transform: 'translateY(-1px)',
        },
        _active: {
          bg: 'rgba(0,0,0,0.1)',
          transform: 'translateY(0)',
        },
      },
      outline: {
        _hover: {
          transform: 'translateY(-1px)',
          boxShadow: 'sm',
        },
        _active: {
          transform: 'translateY(0)',
          boxShadow: 'inner',
        },
      },
    }
  },
  Card: {
    baseStyle: {
      p: '6',
      rounded: 'lg',
      bg: 'white',
      boxShadow: 'md',
    },
  },
  Input: {
    baseStyle: {
      field: {
        fontFamily: 'body',
      }
    },
  },
  FormLabel: {
    baseStyle: {
      fontFamily: 'heading',
      fontWeight: 'medium',
      fontSize: 'sm',
    },
  },
};

// Create the extended theme
const theme = extendTheme({ 
  colors, 
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