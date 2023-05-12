import React, { useEffect, useState } from 'react'

import { styled  , keyframes } from 'styled-components'
import { useParams } from "react-router-dom";

import { Rating } from '@smastrom/react-rating';
import Score from './Score';



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
const Add = styled.div`
    position: absolute;
display: flex;
justify-content: center;
width: 100%;
height: 5rem;
/* border-radius: 100%; */
background: #ffffffa6;
backdrop-filter: blur(2px);
bottom: 0;
margin: 0 auto;
border-top: 1px solid white;

    & > a{
        display: block;
        color: black;
        font-weight: bold;
        margin: auto;
        text-decoration: none;
        
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

const Movies = ({movies, max, isClickable}) => {

    if(max !== 0 || max !== undefined){
        movies = movies.slice(0,4)
    }

    console.log("Movies")
    console.log(movies)

    return (
    
    <CardContainer>
        {
           


           movies.map(({ extID, title, averageScore, overview, poster, posterM, posterS, score }) => (
                
            


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
                    <p>User:</p>
                    <Rating style={{ maxWidth: 100 }} value={score} readOnly /> 
                    </>
                    :
                    null
                    }
                    {
                        isClickable ? <Add><Rating style={{ maxWidth: 200 }} value={score} /> </Add> : null
                    }
                    <img src="..\img\placeholder.svg" alt="" />
                    <img src={posterM} alt="" />

                </div>
                

           ))

}

    </CardContainer>

  )
 
}

export default Movies