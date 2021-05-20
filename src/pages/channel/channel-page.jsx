import React, { useState, useEffect, useRef } from 'react'

import { firestore, createMessageDocument } from '../../firebase/firebase.utils'

import Message from '../../components/message/message.component'

import PageContainer from '../../material-UI/page-container.styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';

const ChannelPage = ({ user, darkMode }) => {
  const [messages, setMessages] = useState([])
  const [noMessages, setNoMessages] = useState(false)
  const textRef = useRef({ text: '' })
  const inputRef = useRef()
  const bottomRef = useRef()

  useEffect(() => {
    const colRef = firestore.collection('messages');

    const unsubscribe = colRef
      .orderBy('createdAt')
      .limit(100)
      .onSnapshot(snapshot => {
        if (snapshot.docs.length === 0) {
          setNoMessages(true)
        } else {
          setNoMessages(false)
        }
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setMessages(data);
      })
    return unsubscribe
  }, [])

  useEffect(() => {
    bottomRef.current.lastChild.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  const getMessage = event => {
    const text = event.target.value.trim()
    textRef.current.text = text
  }

  const handleSubmit = () => {
    const text = textRef.current.text.trim();
    if (text.length > 0) {
      createMessageDocument(user, text);
    }
    textRef.current.text = '';
    inputRef.current.firstChild.value = ''
  }

  return (
    <PageContainer
      style={darkMode ? { backgroundColor: '#24282A' } : null} maxWidth='false'>

      <Container
        disableGutters={true}
        maxWidth='md'
        style={{ height: '87%', color: !darkMode && 'black' }}
      >

        <Box
          height='100%'
          ref={bottomRef}
          style={{ overflowY: 'auto', paddingTop: '76px' }}
        >
          <Typography
            style={{ margin: '20px 0', paddingBottom: '15px', borderBottom: '1px solid white', borderColor: !darkMode && 'black' }} variant='h6'
            component='div'
            align='center'>
            This is the beginning of your Chat
          </Typography>
            {
              !noMessages ? (
                messages.length ? (
                  messages.map(message => {
                    let { id, ...otherProps } = message;
                    return (
                      <Message key={id} {...otherProps} />
                    )
                  })) : (
                  <Box
                    margin='155px auto'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                  >
                    <CircularProgress color='secondary' />
                    <span style={{ display: 'inline-block', margin: '10px 0' }}>Fetching Messages...</span>
                  </Box>
                )
              ) : (
                  <Box
                    textAlign='center'
                    width='100%'
                    margin='20px 0'
                  >
                    <span>Start the Chat</span>
                  </Box>
              )
            }
        </Box>

        <Box
          width='100%'
          marginBottom='10px'
        >
          <Paper ref={inputRef} style={{ display: 'flex', borderRadius: '30px', backgroundColor: '#7b696920' }}>
            <TextareaAutosize
              rowsMax={2}
              onChange={getMessage}
              onKeyUp={event => {
                if (event.code === "Enter") {
                  handleSubmit()
                }
                if (event.keyCode === 13) {
                  handleSubmit()
                }
              }}
              placeholder='Type your message here...'
              style={{ padding: '9px 20px', width: '100%', backgroundColor: 'transparent', minHeight:'42px', fontSize:'16px', color: darkMode && 'white', border:'none', outline:'none' }} />
            <Button
              onClick={handleSubmit}
              style={{ marginRight: '10px', borderRadius: '40px', color: !darkMode && 'black' }}>
              Send
            </Button>
          </Paper>
        </Box>
      </Container>
    </PageContainer>
  )
}

export default ChannelPage