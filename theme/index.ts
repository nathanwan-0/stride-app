import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/inter'
import { theme as baseTheme } from '@saas-ui/react'

import components from './components'
import { fontSizes } from './foundations/typography'

export const theme = extendTheme(
  {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    styles: {
      global: (props: any) => ({
        body: {
          color: 'gray.900',
          bg: 'white',
          fontSize: 'lg',
          _dark: {
            color: 'white',
            bg: 'gray.900',
          },
        },
      }),
    },
    fonts: {
      heading: 'Inter Variable, Inter, sans-serif',
      body: 'Inter Variable, Inter, sans-serif',
    },
    fontSizes,
    colors: {
      primary: {
        50: '#ebf5ff',
        100: '#d0e4ff',
        200: '#a8d0ff',
        300: '#7bb8ff',
        400: '#4f9eff',
        500: '#1a85ff',
        600: '#0066cc',
        700: '#004c99',
        800: '#003366', // this will become --chakra-colors-primary-800
        900: '#001933',
      },
    },
    components,
  },
  baseTheme,
)
