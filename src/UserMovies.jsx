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


const Score = styled.div`
    position: relative;
    display: flex;
    justify-content: center;

    width: 5rem;
    height: 5rem;

    border-radius: 100%;
    background: #ffffffa6;

    backdrop-filter: blur(2px);



    margin: 0 auto;
    /* box-shadow: 3px 3px black; */

    & > svg{
        position: absolute;

        height: 100%;
        width: 100%;

    }



    & p {
        display: block;
        color: black;

        font-weight: bold;
        margin: auto;
    }


`;
// TEST
const Circle = styled.circle`
  fill: transparent;
  stroke: hsl(0, 100%, 80%);
  stroke-width: 0;
  stroke-dashoffset: 66px;
  stroke-dasharray: 0 264;
`;

const dash = (averageScore) => keyframes`
  to {
    stroke-dasharray: ${0 + ((averageScore / 10) * 264)} ${264 - ((averageScore / 10) * 264)};
    stroke: hsl(${(averageScore * 10)}, 100%, 50%);
    stroke-width: .8rem;
    backdrop-filter: blur(.5);


  }
`;

const AnimatedCircle = styled(Circle)`
  animation: ${(props) => dash(props.averagescore)} 2s ease-in-out forwards;
`;


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
    const [suggestion, setSuggestion] = useState([])
    const [userMovies, setUserMovies] = useState([])


    useEffect(() => {
        // console.log("effect")
        // console.log(person)
        if (id !== 0) {
          fetch(`https://localhost:7107/API/movies/${id}`)
            .then((res) => res.json())
            // .then((json) => setSuggestion(json))
            .then((json) => {
                if(json.length < 1){
                    setSuggestion({"isEmpty": true})
                }
                else{
                    setSuggestion(json)
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

            // }
            if (!suggestion.isEmpty) {
                Promise.all(
                  suggestion.map((movie) =>
                    fetch(`https://localhost:7107/API/movies/bydbid?dbID=${movie.movieID}`).then((res) => res.json())
                  )
                ).then((movies) => setUserMovies(movies));
              }
              else {
                setUserMovies([]);
              }






      }, [suggestion])

    //   console.log(suggestion)

      if(!suggestion.isEmpty){

  return (
    <>

    {/* Add movie
        Pass user ID (name?) */}
    <p>Add</p>
    <CardContainer>
        {


            userMovies.map(({ extID, title, averageScore, overview, poster, posterM, posterS }) => (
                <div key={title}>






                    <Info>

                    <h1>{title}</h1>

                    {/* <Rating style={{ maxWidth: 100 }} value={averageScore / 2} readOnly /> */}

                    </Info>
                    <Score>
                    <svg className="test" viewBox="0 0 100 100">
                        <AnimatedCircle cx="50" cy="50" r="42" averagescore={averageScore}>
                        </AnimatedCircle>
                        </svg>
                        <p>

                        {Math.round(averageScore * 10)/10}
                        </p>
                    </Score>
                    <img src={posterM} alt="" />


                </div>

            ))

}

    </CardContainer>
</>



  )
} else{

    return(
        <p>Empty</p>
    )

}

}

export default UserMovies