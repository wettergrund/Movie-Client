import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListUsers from './ListUsers'
import ListMovies from './ListMovies'

import { Rating } from '@smastrom/react-rating';


function App() {


  return (
    <>
      <ListUsers />
      <ListMovies></ListMovies>
     
    </>
  )
}

export default App
