import React from 'react'
import styled from 'styled-components'
import { Rating } from '@smastrom/react-rating';

const Score = styled.div`
    display: flex;
    justify-content: center;

    background: red;
    width: 3rem;
    height: 3rem;

    border-radius: 100%;
    box-shadow: 3px 3px black;


    & p {
        display: block;
    }

`;

const Cards = ({data}) => {

    console.log("Param");
    console.log(data);

  return (
    
            data.map(({ extID, title, averageScore, overview, poster, posterM, posterS }, index) => (
            <dir key={index}>
                



                <dir>{title}</dir>
                <Score>
                    <p>

                    {Math.round(averageScore * 10)/10}
                    </p>
                </Score>
                <Rating style={{ maxWidth: 100 }} value={averageScore / 2} readOnly />
                <img src={posterS} alt="" />
          

            </dir>

        )).slice(0,3)
    
  )
}

export default Cards