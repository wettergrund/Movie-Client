import React, { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'


const ListMovies = () => {

    const [data, setData] = useState([])

    useEffect(()=>{
      
      fetch(`https://localhost:44335/API/movies/search?movie=Titanic`)
      .then((res) => res.json())
      .then((json) => setData(json.results))
      
      },[])
  
      console.log("Data:");
      console.log(data);

  return (

    <>
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
</>
  )
}

export default ListMovies