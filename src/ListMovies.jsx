import React, { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import styled from 'styled-components'


const Cards = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    
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
                <dir>{score}</dir>
                <Rating style={{ maxWidth: 100 }} value={score / 2} readOnly />
                <img src={posterS} alt="" />
          

            </dir>

        )).slice(0,3)

}
</ Cards>
  )
}

export default ListMovies