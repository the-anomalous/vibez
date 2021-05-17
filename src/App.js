import React, {useState, useEffect} from 'react';
import './App.css';

import Header from './components/header/header.component'
import SignInPage from './pages/sign-in/sign-in-page'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/firebase.utils'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'


function App() {
  const [userAuth, loading] = useAuthState(auth)

  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(userAuth)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => setUser(userAuth), [userAuth])
  useEffect(() => setIsLoading(loading), [loading])

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#24282A',
      },
      secondary: {
        main: '#d21055'
      }
    }
  })
  
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Header darkMode={darkMode} user={user} setDarkMode={setDarkMode}/>
        <SignInPage darkMode={darkMode} isLoading={isLoading}/>
      </Paper>
    </ThemeProvider>
  )
}

export default App;