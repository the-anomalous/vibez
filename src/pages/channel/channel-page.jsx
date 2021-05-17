import React, { useState, useEffect, useRef } from 'react'

import { firestore, createMessageDocument } from '../../firebase/firebase.utils'

import Message from '../../components/message/message.component'

import PageContainer from '../../material-UI/page-container.styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';

const ChannelPage = ({ user, darkMode }) => {
  const [messages, setMessages] = useState([])
  const textRef = useRef({ text: '' })
  const inputRef = useRef()
  const bottomRef = useRef()

  useEffect(() => {
    const colRef = firestore.collection('messages');

    const unsubscribe = colRef
      .orderBy('createdAt')
      .limit(100)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setMessages(data);
      })
    return unsubscribe
  }, [])

  const getMessage = event => {
    const text = event.target.value.trim()
    if (text.length > 0) {
      textRef.current.text = text
    }
  }

  const handleSubmit = () => {
    const text = textRef.current.text.trim();
    if (text.length > 0) {
      createMessageDocument(user, text);
    }
    textRef.current.text = '';
    inputRef.current.firstChild.value = ''
    bottomRef.current.lastChild.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <PageContainer
      style={darkMode ? { backgroundColor: '#24282A' } : null} maxWidth='false'>

      <Container
        disableGutters={true}
        maxWidth='md'
        style={{ height: '78%' }}
      >

        <Box
          height='100%'
          ref={bottomRef}
          style={{ overflowY: 'auto' }}
        >
          <Typography
            style={{ margin: '15px 0', paddingBottom: '15px', borderBottom: '1px solid white' }} variant='h6'
            component='div'
            align='center'>
            This is the beginning of your Chat
                </Typography>

          {
            messages.length ? (
              messages.map(message => {
                let { id, ...otherProps } = message;
                return (
                  <Message key={id} {...otherProps} />
                )
              })) : (
              <CircularProgress color='secondary' style={{
                position: 'absolute',
                top: '40%',
                left: '50%'
              }} />
            )
          }
        </Box>

        <Box
          width='100%'
        >
          <Paper style={{ display: 'flex', borderRadius: '30px' }}>
            <InputBase
              ref={inputRef}
              onChange={getMessage}
              placeholder='Type your message here...'
              style={{ padding: '8px 20px', width: '100%' }} />
            <Button
              onClick={handleSubmit}
              style={{ marginRight: '10px', borderRadius: '40px' }}>
              Send
                </Button>
          </Paper>
        </Box>
      </Container>
    </PageContainer>
  )
}

export default ChannelPage
