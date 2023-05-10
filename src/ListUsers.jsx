import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Params from './Params';
import Suggestion from './Suggestion';
import Cards from './Cards';


const ListUsers = () => {
    let history = useHistory();

    const [data, setData] = useState([])
    const [sug, setSug] = useState([])
    const [person, setPerson] = useState(0)
    const [newPerson, setnewPerson] = useState(0)

    const [submit, setSubmit] = useState(false)


  console.log("List user");

  console.log(sug);

    useEffect(()=>{
      
      fetch(`https://localhost:7107/API/users/all`)
      .then((res) => res.json())
      .then((json) => setData(json))
      
      },[])
    
      useEffect(() => {
        console.log("effect")
        console.log(person)
        if (person !== 0) {
          fetch(`https://localhost:7107/API/movies/suggestion/${person}`)
            .then((res) => res.json())
            .then((json) => setSug(json.results))
        }
      }, [newPerson])
      

      const handleSubmit = (event) => {
        event.preventDefault();
        setnewPerson(person)


      }

      const changeHandler = (e) => {

        console.log("User id set to");
        console.log(e.target.value)
        setPerson(e.target.value)
        // history.push(`/suggestion/${e.target.value}`);
        

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
      <Route path={`/suggestion/:id`}>
        {/* <Suggestion data={sug} /> */}
        <Cards data={sug} />
      </Route>
    </Switch>
      </>
  )
}

export default ListUsers