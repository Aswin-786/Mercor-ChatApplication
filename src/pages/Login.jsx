import React from 'react'
import { FirebaseContext } from '../store/Context';
import { useHistory, Link } from 'react-router-dom'

const Login = () => {

  const { firebase } = React.useContext(FirebaseContext)
  const history = useHistory()
  const [error, setError] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    // login with email and password
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      history.push('/')
    }).catch((error) => setError(true))
  }

  let provider = new firebase.auth.GoogleAuthProvider();

  const handleGoogle = (e) => {
    e.preventDefault()
    console.log("ok working")
    firebase.auth()
      .signInWithPopup(provider).then((result) => {
        console.log(result.user.displayName)
        result.user.updateProfile({ displayName: result.user.displayName })
          .then(() => {
            firebase.firestore().collection('users').doc(result.user.uid)
              .set({
                uid: result.user.uid,
                userName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
              })
          })
          .then(() => {
            // create a userChat document in firestore
            firebase.firestore().collection('userChat').doc(result.user.uid).set({})
            history.push('/')
          })
      })

  }

  return (

    <div className='h-[100vh] w-full bg-screen  flex flex-col items-center justify-center font-poppins overflow-y-hidden'>
      <h1 className='text-center md:text-6xl text-5xl font-bold text-white md:py-10 md:-mt-10 py-8'>Chatly</h1>
      <div className='w-[90%] md:w-[400px] md:h-[400px] h-[350px] flex flex-col items-center justify-center bg-gray-100 rounded-xl p-5'>
        <h2 className='text-center text-2xl mb-5 mt-6 font-semibold'>Login</h2>
        <form
          onSubmit={handleSubmit}
          className=' flex items-center justify-center flex-col  '>
          <input
            className='xs:w-[250px] w-[300px] mb-8 outline-none p-2 mt-5  border-b-2 border-b-slate-300 bg-transparent'
            required
            placeholder='email'
            type="email" />
          <input
            className='xs:w-[250px] w-[300px] mb-8 outline-none p-2  border-b-2 border-b-slate-300 bg-transparent'
            required
            placeholder='password'
            type="password" />
          <button className='outline-transparent my-1 border-transparent w-1/2 py-2 text-white bg-cyan-500 rounded-md hover:opacity-70'>Sign In</button>
          <p className='text-gray-600'>or</p>
          <button className='outline-transparent border-transparent my-1 w-[80%] py-2 text-white bg-red-600 rounded-md hover:bg-red-700' onClick={handleGoogle}> <i class="fa-brands fa-google "></i> Sign in with Google </button>
          {
            error
            &&
            <span className='text-xs text-red-500 my-2'>
              something went wrong..
            </span>
          }
          <p className='text-slate-500 text-xs md:text-base  mt-4 '>
            Don't have an account yet?
            <span className='text-black  '>
              <Link to='/signup'>
                Sign up now!
              </Link>
            </span></p><br />
        </form>
      </div>
    </div>

  )
}

export default Login