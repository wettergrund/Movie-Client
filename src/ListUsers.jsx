import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Params from './Params';



const ListUsers = () => {
    let history = useHistory();

    const [data, setData] = useState([])
    const [person, setPerson] = useState(0)

    useEffect(()=>{
      
      fetch(`https://localhost:7107/API/users/all`)
      .then((res) => res.json())
      .then((json) => setData(json))
      
      },[])
      

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted")
        console.log(person)
      }

      const changeHandler = (e) => {
        console.log(e);

        setPerson(e.target.value)
        history.push(`/user/${e.target.value}`);

      }
  return (
    <>
    <Link to="/user/:id">Link</Link>
    <p>
    {person}
    </p>

    <form>
      <select id="favColor" onChange={changeHandler}>

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

    </form>
    <Switch>
      <Route path={`/user/:id`}>
        <Params />
      </Route>
    </Switch>
      </>
  )
}

export default ListUsers