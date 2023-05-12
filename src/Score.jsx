import React from 'react'
import { styled  , keyframes } from 'styled-components'

const ScoreContainer = styled.div`
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

const Score = ({averagescore}) => {
  return (
    <ScoreContainer>
    <svg className="test" viewBox="0 0 100 100">
        <AnimatedCircle cx="50" cy="50" r="42" averagescore={averagescore}>
        </AnimatedCircle>
        </svg>
        <p>

        {Math.round(averagescore * 10)/10}
        </p>
    </ScoreContainer>
  )
}

export default Score