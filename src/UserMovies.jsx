import React, { useEffect, useState } from 'react'

import { styled  , keyframes } from 'styled-components'
import { useParams } from "react-router-dom";

import { Rating } from '@smastrom/react-rating';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";
import AddMovie from './AddMovie';
import Score from './Score';
import Movies from './Movies';




// End test

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    & > div {

        border: 1px solid black;
        border-radius: .5rem;
        background: linear-gradient( #f1f1f1 70%,#bdbdbd);
        box-shadow: 5px 5px black;
        width: 250px;
        padding: 0;
        position: relative;
        height: calc(250px * 1.5);
        overflow: hidden;
        z-index: 0;


        & > img{
            position: absolute;
            top: 0;
            height: 100%;
            z-index: -1;

        }


    }

    /* & > div:first-child{

        border: 2px solid red;
        grid-row: 1 / span 2;



    } */


`;

const Info = styled.div`
            background: linear-gradient( rgba(0,0,0, .5) 60% , rgba(255,0,0,0) );

            min-height: 7rem;

            overflow: scroll;

            & > h1{

            font-size: 1.5rem;
            margin: .5rem;
}


`;

const UserMovies = (props) => {


    let { id } = useParams();
    const [movies, setMovies] = useState([])
    const [userMovies, setUserMovies] = useState([])


    useEffect(() => {
        console.log("Props")
        console.log(props)
        // console.log("effect")
        // console.log(person)
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


        // setUserMovies([])
        // if(!suggestion.isEmpty){


            // suggestion.map((movie) => (

            //     fetch(`https://localhost:7107/API/movies/bydbid?dbID=${movie.movieID}`)
            //     .then((res) => res.json())
            //     // .then((json) => setSuggestion(json))
            //     .then((json) => setUserMovies((old) => [...old, json])
            //     )


            //     ))
            console.log("Movies")
            console.log(movies)
        
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

    <AddMovie user={props} id={id} />
    {/* <Movies movies={userMovies} /> */}
    {/* <CardContainer>
        {
           

            userMovies.map(({ extID, title, averageScore, overview, poster, posterM, posterS, score }) => (
                
                <div key={title}>






                    <Info>

                    <h1>{title}</h1>

                    

                    </Info>
     
                    <Score averagescore={averageScore} />
                    {score > 0 && score <= 5 ? 
                    <>
                    <p>User:</p>
                    <Rating style={{ maxWidth: 100 }} value={score} readOnly /> 
                    </>
                    :
                    null
                    }
                    <img src={posterM} alt="" />


                </div>

            ))

}

    </CardContainer> */}
</>



  )
} else{

    return(
        <p>Empty</p>
    )

}

}

export default UserMovies