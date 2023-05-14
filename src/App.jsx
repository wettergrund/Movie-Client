import { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import styled from 'styled-components'

import UserMovies from './UserMovies'


// Styled components
const Wrapper = styled.div`

  position: relative;
  width: 100%;
  margin: 0 auto;
  max-width: 1400px;
  box-shadow: 0 0 50px rgb(0,0,0,0.25);
  min-height: 100vh;
  background: #253240;
`;

const MainContainer = styled.div`
  
  margin: 0 auto;
  width: 100%;

`;


const UserContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #1b2634;
  flex-wrap: wrap;
  gap: 1rem;
  height: 100%;
  padding: 0 1rem;

`;


const MyLink = styled(NavLink)`
  flex: 1 1 0;
  color: #8992ae;
  text-decoration: none;
  text-align: center;

  height: 4rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  
 & * h2{

  color: #bec8f0;
 }

  
  &.active{
    color: #bec8f0;
    background: #253240;
  }

`;

function App() {

    const [data, setData] = useState([])

    // Get all users in the database on load
    useEffect(()=>{
      fetch(`https://localhost:7107/API/users/all`)
      .then((res) => res.json())
      .then((json) => setData(json))
      
      },[])
    

  return (
    <Wrapper>
    <UserContainer>
          <MyLink exact to="/"  key="Hem" >
            <div >
            <h2>MovieDb</h2>
            </div>
          </MyLink>
          { 
          // Generate a link for each user in DB (data)
          data.map((user, index) => (
            <MyLink to={`/${user.id}`} key={index}>
            <div >
            <div>{user.name}</div>
            </div>
          </MyLink>
        ))
      }
      </ UserContainer>
    <MainContainer>
      <Switch>
      <Route path={`/:id`}>
        {/* Link movies page based on user ID */}
        <UserMovies user={data} />
      </Route>
      <Route path={`/`}>
        {/* Default landing page */}
        <h1>MovieDb</h1>
        <p>This is a movie site to practice React and working with a backend and APIs. </p>
        <p>Select a user above to see movies and genres they like.</p>
        <p>You can also add new movies to user's list.</p>
      </Route>
    </Switch>
    
    </MainContainer>
    </ Wrapper>
  )
}

export default App
