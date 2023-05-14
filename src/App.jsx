import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListUsers from './ListUsers'
import ListMovies from './ListMovies'
import Params from './Params';
import Cards from './Cards';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  NavLink
} from "react-router-dom";

import styled from 'styled-components'


import { Rating } from '@smastrom/react-rating';
import Genres from './Genres'
import UserMovies from './UserMovies'

const Wrapper = styled.div`

  /* display: grid; */
  /* grid-template-rows: 30% 1fr; */
  /* min-height: 100vh; */
  position: relative;
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
  box-shadow: 0 0 50px rgb(0,0,0,0.25);
  min-height: 100vh;
  background: #253240;
`;

const MainContainer = styled.div`
  
  margin: 0 auto;
  width: 100%;
  /* max-width: 500px; */


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

const Footer = styled.div`

  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  background-color: #181d23;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;


`;

const UserCard = styled.div`


  border-radius: .5rem;
  

`;

const MyLink = styled(NavLink)`
  flex: 1 1 0;
  /* width: 0; */
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
  let history = useHistory();

    const [data, setData] = useState([])
    const [person, setPerson] = useState(0)





    useEffect(()=>{
      
      fetch(`https://localhost:7107/API/users/all`)
      .then((res) => res.json())
      .then((json) => setData(json))
      
      },[])
    
      

      const handleSubmit = (e) => {
        e.preventDefault();

        console.log("User " + person + " is submitted");
        // setnewPerson(person)

        history.push(`/suggestion/${person}`);



      }

      const changeHandler = (e) => {

        console.log("User id changed to " + e.target.value)
        setPerson(e.target.value)
        

      }

  return (
    <Wrapper>
    {/* <ListUsers /> */}
    <UserContainer>
          {/* <h1>Start</h1> */}
          <MyLink exact to="/"  key="Hem" >
              
            <UserCard >
        
        
            <h2>MovieDb</h2>
            
            </UserCard>
          </MyLink>
          { 
          
          data.map((user, index) => (
            <MyLink to={`/${user.id}`} key={index}>
              
            <UserCard >
        
        
            <div>{user.name}</div>
            
            </UserCard>
          </MyLink>
        
        
        
        ))
      }
      </ UserContainer>

    <MainContainer>
  
      <Switch>
  
      <Route path={`/:id`}>
        <UserMovies user={data} />
      
      </Route>
      <Route path={`/`}>
        <h1>MovieDb</h1>
        <p>This is a movie site to practice React and working with a backend and APIs. </p>
        <p>Select a user above to see movies and genres they like.</p>
        <p>You can also add new movies to user's list.</p>

       
      </Route>
    </Switch>
    
    </MainContainer>
    {/* <Footer>
      Footer
    </Footer> */}
    </ Wrapper>
  )
}

export default App
