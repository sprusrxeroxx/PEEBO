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

const fonts = {
  heading: "'Montserrat', sans-serif",
  body: "'Open Sans', sans-serif",
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'brand.dark' : 'brand.light',
      color: props.colorMode === 'dark' ? 'white' : 'brand.dark',
    },
  }),
};

const components = {
  Button: {
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
  Heading: {
    baseStyle: {
      fontWeight: '600',
      color: 'brand.dark',
    },
  },
};

const theme = extendTheme({ 
  colors, 
  fonts, 
  styles, 
  components 
});

export default theme;