import React from 'react'
import { signInWithGoogle } from '../../firebase/firebase.utils'

const SignInPage = () => {
  return (
    <div>
      <button onClick={signInWithGoogle} >Sign In with google</button>
    </div>
  )
}

export default SignInPage
