// Para fins de estudo, este código está, propositalmente, com muitos comentários, o que muitas vezes prejudica a legibilidade. Porém, optei por manter dessa forma nos exercícios para relembrar os conceitos, quando precisar revisar!
import { CyclesContextProvider } from './contexts/CyclesContext'

import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
