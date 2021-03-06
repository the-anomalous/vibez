import React from 'react'

import { formatDate} from './utils'

import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'

const Message = ({ createdAt, photoURL, text, displayName }) => {
  const nameArr = displayName.split(' ')
  let formattedName = ''

  nameArr.forEach(name => {
    formattedName += name.charAt(0).toUpperCase() + name.slice(1) + ' '
  })

  return (
    <Box
      display='flex'
      flexDirection='row'
      margin='10px 0'
      padding='15px 5px'
      borderRadius='4px'
      style={{ zIndex: '-1' }}
      className='message-box'
    >
      <Box
        marginRight='10px'
      >
        <Avatar alt='user avatar' src={photoURL}/>
      </Box>
      
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Box marginBottom='5px'>
          <span style={{ color: '#d21055', display:'inline-block', fontWeight:'600' }}>{formattedName}</span>
          <span style={{ fontSize: '13px', marginLeft: '10px', display: 'inline-block'}}>{formatDate(new Date(createdAt.seconds * 1000))}</span>
        </Box>
        <Box
          style={{ wordBreak:'break-word'}}
        >
          {text}
        </Box>
      </Box>
    </Box>
  )
}

export default Message