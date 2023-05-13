import React, { useEffect, useState } from 'react'

import { styled  , keyframes } from 'styled-components'
import { useParams } from "react-router-dom";


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";
import AddMovie from './AddMovie';
import Movies from './Movies';





const UserMovies = (props) => {


    let { id } = useParams();
    const [movies, setMovies] = useState([])
    const [userMovies, setUserMovies] = useState([])


    useEffect(() => {
    //List movies based on id  
        if (id !== 0) {
          fetch(`https://localhost:7107/API/movies/${id}`)
            .then((res) => res.json())
            // .then((json) => setSuggestion(json))
            .then((json) => {
                if(json.length < 1){
                    setMovies({"isEmpty": true})
                }
                else{
                    setMovies(json)
                }
            })


        }
      }, [id])

      useEffect(() => {
        // Get movie details per movie

            // console.log("Movies")
            // console.log(movies)
        
            if (!movies.isEmpty) {
                Promise.all(
                    movies.map((movie) => 
                    fetch(`https://localhost:7107/API/movies/bydbid?dbID=${movie.movieID}`)
                    .then((res) => res.json())
                    .then((movieData) => ({
                      ...movieData,
                      score: movie.userRating
                    }))
                )
              ).then((movies) => setUserMovies(movies));
              }
              else {
                setUserMovies([]);
              }






      }, [movies])

    //   console.log(suggestion)

      if(!movies.isEmpty){

  return (
    <>

    <AddMovie user={props} usermovies={userMovies} id={id} />
    {/* <Movies movies={userMovies} /> */}

</>



  )
} else{

    return(
        <p>Empty</p>
    )

}

}

export default UserMovies