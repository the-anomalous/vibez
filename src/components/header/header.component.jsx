import React from 'react'

import { ReactComponent as DarkModeLogo } from '../../assets/dark-mode.logo.svg';
import { ReactComponent as LightModeLogo } from '../../assets/light-mode.logo.svg';

import { signOut } from '../../firebase/firebase.utils'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const Header = ({ user, darkMode, setDarkMode}) => {
  return (
    <AppBar position='fixed' style={{ height: 76, backgroundColor: darkMode ? null : '#fff'}}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        {
          darkMode ? <DarkModeLogo style={{ width: 180 }} /> : <LightModeLogo style={{ width: 180 }} />
        }

        <Box>
          {
            user ? (
              <Button onClick={signOut} variant='outlined' color='secondary' style={{marginRight:'15px'}}>
                <Typography variant="subtitle2" style={{ fontFamily: 'koho', fontWeight:'bold' }}>Sign Out</Typography>
              </Button> ) : null
          }
          {
            darkMode ? (
              <IconButton onClick={() => setDarkMode(!darkMode)}>
                <i className="fas fa-moon"></i>
              </IconButton>
            ) : (
              <IconButton onClick={() => setDarkMode(!darkMode)}>
                <i className="fas fa-sun"></i>
              </IconButton>
            )
          }
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
