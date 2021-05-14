import React from 'react'

import { signOut } from '../../firebase/firebase.utils'
import { getTextMessages } from '../../firebase/firebase.utils'

const ChannelPage = ({userAuth}) => {
  getTextMessages()
  
  return (
    <div>
      <button onClick={signOut}>Sign Out</button>
      Channel Page
    </div>
  )
}

export default ChannelPage
