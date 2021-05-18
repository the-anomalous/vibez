import React from 'react'
import { signInWithGoogle } from '../../firebase/firebase.utils'

import PageContainer from '../../material-UI/page-container.styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress';

const SignInPage = ({ darkMode, isLoading }) => {
  const GoogleIcon = () => {
    return (
      <img src="https://img.icons8.com/color/50/000000/google-logo.png" width='22px' alt='google avatar'/>
    )
  }

  return (
    <PageContainer style={darkMode ? { backgroundColor: '#24282A' } : null} maxWidth='false'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        height='90%'
      >
        <Paper align='center' style={{
          height: '260px', boxShadow: '0px 2px 20px -1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)', backgroundColor: !darkMode && 'rgba(0,0,0,.06)'
        }}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-around'
            flexDirection='column'
            height='100%'
            padding='0 40px'
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-around'
              flexDirection='column'
              height='100px'
            >
              <Typography style={{fontFamily: 'koho', margin:'20px 0'}} variant='h4' component='h2'>Welcome to Vibez</Typography>
              <Typography variant='subtitle1'>Simplest way to chat with people all around the world</Typography>
            </Box>
            
            {
              isLoading ? (
                <CircularProgress color='secondary'/>
             ) : (
              <Button size='small' onClick={signInWithGoogle} variant="contained" color='secondary' startIcon={<GoogleIcon/>} style={{padding:'14px 18px'}}>
              Sign In With Google
            </Button>
             )
            }
            
          </Box>
        </Paper>
      </Box>
      
    </PageContainer>
  )
}

export default SignInPage
