import { useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header,Footer} from './components/index.js'

function App() {

  const [loding,setLoding] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(()=>{

    // Fetch data from API
    // setLoding(true)
    // fetch('https://api.example.com/data')
    //  .then(response => response.json())
    //  .then(data => {
    //     dispatch({type: 'SET_DATA', payload: data})
    //     setLoding(false)
    //   })
    //  .catch(error => {
    //     console.error('Error:', error)
    //     setLoding(false)
    //   })

    authService.getCurrentUser()

    .then((userData)=>{
      if(userData)
      {
        dispatch(login(userData));
      }
      else{
        // redirect to login page
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoding(false)
    })

  },[]);
  
  return ! loding ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
        {/* Outlet */}
        </main>
        <Footer/>
      </div>
    </div>
  ) : <div> loading........ </div>
    
  
}

export default App
