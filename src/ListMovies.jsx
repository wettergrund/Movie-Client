import React, { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import styled from 'styled-components'


const Cards = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;


    & > dir {

        border: 1px solid black;
        border-radius: .5rem;
        background: linear-gradient( #f1f1f1 70%,#bdbdbd);
        box-shadow: 5px 5px black;

        width: 250px;
    }
    
`;
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

const ListMovies = () => {

    const [data, setData] = useState([])

    useEffect(()=>{
      
      fetch(`https://localhost:7107/API/movies/search?movie=Titanic`)
      .then((res) => res.json())
      .then((json) => setData(json.results))
      
      },[])
  
      console.log("Data:");
      console.log(data);

  return (

    <Cards>
    {
        data.map(({ extID, title, averageScore: score, overview, poster, posterM, posterS }, index) => (
            <dir key={index}>
                



                <dir>{title}</dir>
                <Score>
                    <p>

                    {Math.round(score * 10)/10}
                    </p>
                </Score>
                <Rating style={{ maxWidth: 100 }} value={score / 2} readOnly />
                <img src={posterS} alt="" />
          

            </dir>

        )).slice(0,3)

}
</ Cards>
  )
}

export default ListMovies