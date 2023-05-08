import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])

  useEffect(()=>{
    
    fetch(`https://localhost:7107/API/users/all`)
    .then((res) => res.json())
    .then((json) => setData(json))
    
    },[])



    console.log(data)

  return (
    <>
      {
        data.map((user, index) => (
          <dir key={index}>


          <dir>{user.name}</dir>
          <dir>{user.email}</dir>

          </dir>

        ))
      }
    </>
  )
}

export default App
