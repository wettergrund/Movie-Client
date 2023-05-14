import React, { useEffect, useState } from 'react'

import { styled  , keyframes } from 'styled-components'
import { useParams } from "react-router-dom";



import { Rating } from '@smastrom/react-rating';
import Score from './Score';

import axios from 'axios';


const CardContainer = styled.div`
    /* display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem; */

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;

    flex-wrap: wrap;

    & > div {

        /* border: 1px solid black; */
        border-radius: .25rem;
        background: linear-gradient( #f1f1f1 70%,#bdbdbd);
        /* box-shadow: 5px 5px black; */
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
const Add = styled.div`
    position: absolute;
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
width: 100%;
height: 5rem;
/* border-radius: 100%; */
background: #ffffffa6;
backdrop-filter: blur(2px);
bottom: 0;
border-top: 1px solid white;

    & > a{
        display: block;
        color: black;
        font-weight: bold;
        margin: auto;
        text-decoration: none;
        
    }

    & > p{
        color: black;
        font-size: .8rem;
        margin: 0;
    }

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



const Movies = ({movies, max, isClickable, userid}) => {

    const [moviesState, setMoviesState] = useState([]);

    useEffect(() => {
        setMoviesState(movies);
    }, [movies]);
    

    const handleRemoveMovie = (id) => {

        const newMovies = moviesState.filter((movie) => movie.extID !== id);
   
        setMoviesState(newMovies);
      };

    const connectMovie = (score, extID, userid) =>{
        
        const userIdNum = Number(userid);
    

    
        axios.post(`https://localhost:7107/API/movie/userlink?userID=${userid}&extId=${extID}&rating=${userIdNum}`,
            
            )
            .then(response => {
                console.log(response);
                

                handleRemoveMovie(extID);
    
    
    
    
            })
            .catch(error => {
                console.error(error);
            });
    
    
    }



    if(max !== 0 || max !== undefined){
        movies = movies.slice(0,8)
    }

    console.log("Movies")
    console.log(movies)

    return (
    
    <CardContainer>
        
        {
           


           moviesState.slice(0,4).map(({ extID, title, averageScore, overview, poster, posterM, posterS, score }) => (
                
            


                <div key={extID}>
                    <Info>

                    <h1>{title}</h1>

                    

                    </Info>
                    {averageScore > 0 ? 
                    <Score averagescore={averageScore} /> :
                    null
                    }
                    {score > 0 && score <= 5 ? 
                    <>
                    {/* <p>User:</p>
                    <Rating style={{ maxWidth: 100 }} value={score} readOnly />  */}
                    </>
                    :
                    null
                    }
                    <Add>
                    <p>Users score</p>
                    {
                        isClickable ? 
                        <Rating style={{ maxWidth: 200 }} value={score} onChange={(e) => connectMovie(e,extID, userid)} />  : 
                        score > 0 && score <= 5 ? 
                        <Rating style={{ maxWidth: 150 }} value={score} readOnly  /> : 
                        <Rating style={{ maxWidth: 150 }} isDisabled  />
                    }
                    </Add>
                    <img src="..\img\placeholder.svg" alt="" />
                    <img src={posterM} alt="" />

                </div>
                

           ))

}

    </CardContainer>

  )
 
}

export default Movies