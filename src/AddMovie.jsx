import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { styled  , keyframes } from 'styled-components'

import Movies from './Movies';

const SearchButton = styled.input`
    background: #21e08b;
    color: white;

    border: 0;
    padding: 1rem .7rem;
    width: 8rem;
    border-radius: 0 2rem 2rem 0;

`;
const InputField = styled.input`
    background: #515863;
    color: white;

    border: 0;
    padding: 1rem .7rem;
    width: 16rem;
    border-radius: 2rem 0 0 2rem;

`;

const SearchArea = styled.div`
  margin: 2rem;

`;


const AddMovie = ({user, usermovies}) => {
    let { id } = useParams();
    const [userDetails, setUserDetails] = useState([0])
    const [name, setName] = useState("Unknown");
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      console.log("UserMovies")
      console.log(usermovies)
      if (id !== 0) {
        const temp = user.user.filter(obj => obj.id == id);
      console.log(temp[0])

        if (temp.length > 0) {
          setUserDetails(temp[0]);
        }
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
    <SearchArea>
    {/* <p>Sök på en film du vill lägga till {user}</p> */}
    <h2>Lägg till film för {name} </h2>
    <form onSubmit={submitHandler}>
      
      <InputField type="text" onChange={changeHandler} value={input}></InputField>
      <SearchButton type="submit" value="Sök" />

    </form>


    <Movies movies={movies} userid={id} isClickable />

    
    
    </ SearchArea>
  )
}

export default AddMovie