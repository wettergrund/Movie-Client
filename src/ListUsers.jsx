import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Params from './Params';
import Cards from './Cards';





const ListUsers = () => {
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
    <>
    {/* <Link to="/user/:id">Link</Link>
    <Link to="/suggestion/6">Sugg</Link> */}

    <p>
    {person}
    </p>

    <form onSubmit={handleSubmit}>
      <select id="favColor" onChange={changeHandler}>
      <option key={0} value={0} >Välj en användare</option>

    {
      
      data.map((user, index) => (
        //   <dir key={index}>
        
        
        // <dir>{user.name} "test"</dir>
        // <dir>{user.email}</dir>
        
        // </dir>
        <option key={index} value={user.id} >{user.name}</option>
        
        
        ))
        
      }
        </select>
      <input type="submit" value="Test" />
    </form>
    <Switch>
      <Route path={`/user/:id`}>
        <Params />
      </Route>
      <Route path={`/suggestion/0`}>
          <h1>Välj en användare</h1>
        <Cards />
      </Route>
      <Route path={`/suggestion/:id`}>
        <Cards />
      </Route>
    </Switch>
      </>
  )
}

export default ListUsers