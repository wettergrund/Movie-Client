import React, { useEffect, useState } from 'react'

import { styled  , keyframes } from 'styled-components'
import { useParams } from "react-router-dom";

const Genres = (p) => {

let { id } = useParams();

const [genres, setGenres] = useState([]);

  useEffect(() => {
    // console.log("effect")
    // console.log(person)
    if (id !== 0) {
  
        
        fetch(`https://localhost:7107/API/genres/${id}`)
            .then((res) => res.json())
            // .then((json) => setGenres(json))
            .then((json) => {

                json.length !== 0 ? setGenres(json) : setGenres([  {    "id": null,    "title": "Tomt",    "extID": null,    "description": null  }])


                })
            

                

    }
  }, [id])

  const uniqueGenres = [...new Set(genres.map((genre) => genre.title))];
  console.log(uniqueGenres)

  return (
    // <div>Genres</div>
    <>

    {
      
      uniqueGenres.map(genre => (
        
        <div key={genre}>{genre}</div>
        
        
     ))   
    }
    </>
  )
}

export default Genres