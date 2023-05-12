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

border: 1px solid black;
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;


`;

const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;


`;

const UserContainer = styled.div`
  background: #282f4a;
  flex-wrap: wrap;
  gap: 1rem;
  height: 100%;
  padding: 0 1rem;

  & .active{
    color: #bec8f0;
  }

`;
const UserCard = styled.div`


  border-radius: .5rem;
  
  & > div{

  }

`;

const MyLink = styled(NavLink)`
  flex: 1 1 0;
  width: 0;
  color: #8992ae;
  text-decoration: none;
  
  
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
          <MyLink exact to="/"  key="0" >
              
            <UserCard >
        
        
            <div>Hem</div>
            
            </UserCard>
          </MyLink>
          { 
          
          data.map((user, index) => (
            <MyLink to={`/suggestion/${user.id}`} key={index}>
              
            <UserCard >
        
        
            <div>{user.name}</div>
            
            </UserCard>
          </MyLink>
        
        
        
        ))
      }
      </ UserContainer>

    <MainContainer>
      <p>Container</p>
      {/* <ListMovies /> */}

      <Switch>
      <Route path={`/user/:id`}>
        <Params />
      </Route>
      <Route path={`/suggestion/:id`}>
        <Link to={`/`}>Back</Link>
        {/* <Genres user={data}/> */}
        <UserMovies user={data} />
        {/* <Cards /> */}
      </Route>
      <Route path={`/`}>
        <h1>Start</h1>

       
      </Route>
    </Switch>
     
    </MainContainer>
    </ Wrapper>
  )
}

export default App
