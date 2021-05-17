import React, {useState, useEffect, useRef} from 'react'

import { signOut } from '../../firebase/firebase.utils'
import { firestore, createMessageDocument } from '../../firebase/firebase.utils'

import { formatRelative } from 'date-fns';

import { ReactComponent as Logo } from '../../assets/logo.svg';

const ChannelPage = ({userAuth}) => {
  const [messages, setMessages] = useState([])
  const ref = useRef({
    text: ''
  })
    
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
      ref.current.text = text
    }
  }
  
  const formatDate = date => {
    let formattedDate = '';
    if (date) {
      
      formattedDate = formatRelative(date, new Date());
      
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
  };
  
  const handleSubmit = () => {
    const text = ref.current.text.trim();
    if (text.length > 0) {
      createMessageDocument(userAuth, text);
    }
    ref.current.text = '';
  }
  
  return (
    <div>
      <Logo/>
      <button onClick={signOut}>Sign Out</button>
      <ul>
        {
          messages.map(message => (
            <li key={message.id}>
              <img src={message.photoURL} width = '45px' alt="avatar" />            
              {message.text}
              <span>{formatDate(new Date(message.createdAt.seconds * 1000))}</span>
            </li>
          ))
        }
      </ul>
      <input type="text" placeholder='Type Message' onChange={getMessage} />
      <button onClick={handleSubmit} type="submit">Send Message</button>
    </div>
  )
}

export default ChannelPage
