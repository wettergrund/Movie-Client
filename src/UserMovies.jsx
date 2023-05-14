import React, { useEffect, useState } from 'react'

import { styled  , keyframes } from 'styled-components'
import { useParams } from "react-router-dom";
// import { arrow as Arrow } from '../icons/arrow-left-solid.svg'



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
import Genres from './Genres';

const MyLink = styled(NavLink)`
    text-align: center;
  color: #8992ae;
  text-decoration: none;
  font-size: .75rem; 
  margin-bottom: 1.5rem; 


  &.active{
    color: #bec8f0;
    
    & * {
        fill: #bec8f0;
    }
  }

  & svg{
    height: 1.5rem; 
  }

  & p{
    margin: 0;
  }

 
  
`;

const UserNav = styled.div`
    background: #3b4856;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;

     > :first-child{
    background-color: #21e08b;
    width: 3rem;
    height: 3rem; 
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 2rem; 
    
    & svg{

        height: 1rem; 
    }

  }

    
`;

const Wrapper = styled.div`
    display: grid;
    background: #253240;
    grid-template-columns: 7rem 1fr;
    position: relative;
    width: 100%;
    min-height: 80vh;
    
`;

const Icon = styled.path`
    fill: #545f6d;
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

        console.log(props)
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

    const hasMovies = (
        <>
            <MyLink exact to={`/${id}/liked`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <Icon d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
            </svg>
                <p>Saved movies</p> </MyLink>
            <MyLink exact to={`/${id}/genres`}>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <Icon d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/>
            </svg>
            <p>Genres</p>
                
            </MyLink>
        </>
      );

      

  return (
    <Wrapper>
        <UserNav>
        <MyLink exact to={`/`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <Icon d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>

        </MyLink>
        

        {!movies.isEmpty ? 
            hasMovies
            : null
        }
        <MyLink exact to={`/${id}/add`}> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <Icon d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
        </svg>
        <p>Add movie</p>
        </MyLink>

        </UserNav>

        <Switch>
        <Route exact path={`/${id}`}>

                <p>Use the navigation bar on the left to see users genres, movies or add a new movie to the list.</p>

            </Route>
            <Route path={`/${id}/liked`}>

                <Movies movies={userMovies} />

            </Route>
            <Route path={`/:id/add`}>

                <AddMovie user={props} usermovies={userMovies} />

            </Route>
            <Route path={`/:id/genres`}>

                <Genres user={props.user}/>


            </Route>
        </Switch>
        
    </ Wrapper>


  )


}

export default UserMovies