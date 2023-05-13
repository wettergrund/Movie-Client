import React, { useEffect, useState } from 'react'

import { styled  , keyframes } from 'styled-components'
import { useParams } from "react-router-dom";


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    NavLink
  } from "react-router-dom";
import AddMovie from './AddMovie';
import Movies from './Movies';

const MyLink = styled(NavLink)`
  flex: 1 1 1;
  width: 0;
  color: #8992ae;
  text-decoration: none;

  &.active{
    color: #bec8f0;
  }
  
`;




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

    //   if(!movies.isEmpty){

  return (
    <>

    {!movies.isEmpty ? 
        <MyLink exact to={`/${id}/liked`}>Sparade filmer </MyLink>
         : null
    }
    {/* <MyLink exact to={`/${id}/liked`}>Hejsan </MyLink> */}
    <MyLink exact to={`/${id}/add`}>+ Add movie</MyLink>


    <switch>
        <Route path={`/${id}/liked`}>

            <Movies movies={userMovies} />

        </Route>
        <Route path={`/${id}/add`}>

            <AddMovie user={props} usermovies={userMovies} id={id} />

        </Route>
    </switch>
    
</>



  )


}

export default UserMovies