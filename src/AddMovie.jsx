import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { styled } from 'styled-components'

import Movies from './Movies';


// Styled components

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
    // const [userDetails, setUserDetails] = useState([0])
    const [name, setName] = useState("Unknown");
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);

    // Store user details for the current user
    useEffect(() => {

      if (id !== 0) {
        const temp = user.user.filter(obj => obj.id == id);
      console.log(temp[0])

        if (temp.length > 0) {
          // setUserDetails(temp[0]);
          setName(temp[0].name);
        }
      }
    }, [id])


      // Reset when ID is changed
      useEffect(() => {
        setInput("");
        setMovies([]);
      }, [id]);


    const submitHandler = (e) => {
      e.preventDefault()
      setSearch(input)
    }

    const changeHandler = (e) => {
      setInput(e.target.value)
    }

    useEffect(() => {

      if (search.length !== 0) {
        fetch(`https://localhost:7107/API/movies/search?movie=${search}`)
          .then((res) => res.json())
          .then((json) => setMovies(json.results))
      }

    }, [search])

  return (
    <SearchArea>
    <h2>Add movie for {name} </h2>
    <p>Search for a movie below</p>
    <form onSubmit={submitHandler}>

      <InputField type="text" onChange={changeHandler} value={input}></InputField>
      <SearchButton type="submit" value="Sök" />

    </form>


    <Movies movies={movies} userid={id} isClickable />



    </ SearchArea>
  )
}

export default AddMovie