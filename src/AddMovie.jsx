import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import Movies from './Movies';


const AddMovie = ({user, id}) => {
    // let { id } = useParams();
    const [userDetails, setUserDetails] = useState([0])
    const [name, setName] = useState("Unknown");
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // console.log("effect")
        // console.log(person)
        if (id !== 0) {
            const temp = user.user.filter(obj => obj.id == id);
    
            
            setUserDetails(temp[0]);
            
            

        
     
        }
      }, [id])


      useEffect(() => {
        console.log("Details")
        console.log(userDetails)
        setName(userDetails.name)
        
      }, [userDetails])


      useEffect(() => {
        setInput("");
        setMovies([]);
      }, [id]);



    const submitHandler = (e) => {
      // LOgic for listing movies
      e.preventDefault()
      setSearch(input)
    }
      
   

    

    const changeHandler = (e) => {
      setInput(e.target.value)
    }
    

    useEffect(() => {
      console.log("Props")
      console.log(search)
      // console.log("effect")
      // console.log(person)
      if (search.length !== 0) {
        fetch(`https://localhost:7107/API/movies/search?movie=${search}`)
          .then((res) => res.json())
          // .then((json) => setSuggestion(json))
          // .then((json) => console.log(json))
          .then((json) => setMovies(json.results))




      }
    }, [search])
        
  return (
    <>
    {/* <p>Sök på en film du vill lägga till {user}</p> */}
    <div>Lägg till film för {name} </div>
    <form onSubmit={submitHandler}>
      
      <input type="text" onChange={changeHandler} value={input}></input>
      <input type="submit" value="Sök" />

    </form>


    <Movies movies={movies} isClickable />

    
    
    </>
  )
}

export default AddMovie