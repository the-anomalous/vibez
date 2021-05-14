import React, {useState, useEffect} from 'react';
import './App.css';

import SignInPage from './pages/sign-in/sign-in-page'
import ChannelPage from './pages/channel/channel-page'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase.utils'

function App() {
  const [user, loading] = useAuthState(auth)

  const [isLoading, setIsLoading] = useState(loading)
  const [userAuth, setUserAuth] = useState(user)

  useEffect(() => setUserAuth(user) , [user])
  useEffect(() => setIsLoading(loading), [loading])
  
  if (isLoading) {
    return (
      <div>
        ... is Loading
      </div>
    )
  }

  if (userAuth) {
    return (
      <div>
        <ChannelPage userAuth={userAuth}/>
      </div>
    )
  }

  if (!userAuth) {
    return (
      <div>
        <SignInPage/>
      </div>
    );
  }
}

export default App;
