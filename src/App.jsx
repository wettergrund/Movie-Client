import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListUsers from './ListUsers'
import ListMovies from './ListMovies'

import styled from 'styled-components'


import { Rating } from '@smastrom/react-rating';

const Container = styled.div`
  margin: 0 auto;
  max-width: 800px;

  background: #dadada;

`;

function App() {


  return (
    <Container>
      <ListUsers />
      {/* <ListMovies></ListMovies> */}
     
    </Container>
  )
}

export default App
