import '../styles/index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
// Temporary workaround for RouterContext import: https://github.com/storybookjs/storybook/issues/24234#issuecomment-1726353377
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

const defaultTheme = createTheme() // or your custom theme

const withThemeProvider = (Story, context) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Story {...context} />
    </ThemeProvider>
  )
}

export const decorators = [withThemeProvider]

// ...other storybook exports
export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
    locale: 'en'
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  previewTabs: {
    'storybook/docs/panel': { index: 0 }
  },
  viewMode: 'docs'
}
