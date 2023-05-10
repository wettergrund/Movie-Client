import React, { useEffect, useState } from 'react'

import { styled  , keyframes } from 'styled-components'
import { useParams } from "react-router-dom";

import { Rating } from '@smastrom/react-rating';


const Score = styled.div`
    position: relative;
    display: flex;
    justify-content: center;

    width: 3rem;
    height: 3rem;

    border-radius: 100%;
    box-shadow: 3px 3px black;

    & > svg{
        position: absolute; 

        height: 100%;
        width: 100%;

    }



    & p {
        display: block;
    }


`;
// TEST
const Circle = styled.circle`
  fill: transparent;
  stroke: hsl(0, 100%, 50%);
  stroke-width: .5rem;
  stroke-dashoffset: 66px;
  stroke-dasharray: 0 264;
`;

const dash = (averageScore) => keyframes`
  to {
    stroke-dasharray: ${0 + ((averageScore / 10) * 264)} ${264 - ((averageScore / 10) * 264)};
    stroke: hsl(${averageScore * 10}, 100%, 50%);

  }
`;

const AnimatedCircle = styled(Circle)`
  animation: ${(props) => dash(props.averageScore)} 2s ease-in-out forwards;
`;


// End test

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;


    & > dir {

        border: 1px solid black;
        border-radius: .5rem;
        background: linear-gradient( #f1f1f1 70%,#bdbdbd);
        box-shadow: 5px 5px black;
        width: 250px;
        padding: 0;
        position: relative;
        height: 400px;
        overflow: hidden;
        z-index: 0;


        & > img{
            position: absolute;
            top: 0;
            height: 100%;
            z-index: -1;
        }

    }

    
`;

const Info = styled.div`
            background: #000;
            height: 30%;

            overflow: scroll;


`;


const Cards = () => {

    
    let { id } = useParams();
    const [suggestion, setSuggestion] = useState([])



    useEffect(() => {
        // console.log("effect")
        // console.log(person)
        if (id !== 0) {
          fetch(`https://localhost:7107/API/movies/suggestion/${id}`)
            .then((res) => res.json())
            .then((json) => setSuggestion(json.results))
        }
      }, [id])

  return (
        
    <CardContainer>
    
        {
            
            
            suggestion.map(({ extID, title, averageScore, overview, poster, posterM, posterS }, index) => (

                <dir key={index}>
                 





                <Info>
      
                <dir>{title}</dir>
                <Score>
                <svg className="test" viewBox="0 0 100 100">
                    <AnimatedCircle cx="50" cy="50" r="42" averageScore={averageScore}>
                    </AnimatedCircle>
                    </svg>
                    <p>

                    {Math.round(averageScore * 10)/10}
                    </p>
                </Score>
                {/* <Rating style={{ maxWidth: 100 }} value={averageScore / 2} readOnly /> */}

                </Info>
                <img src={posterS} alt="" />
          

            </dir>

        )).slice(0,4)
        }
      
    </CardContainer>
    
  )
}

export default Cards