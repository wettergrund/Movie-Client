import React, { useEffect, useState } from 'react'

import { useParams } from "react-router-dom";

const Genres = (p) => {

let { id } = useParams();

const [genres, setGenres] = useState([]);


  // Set user genre state
  useEffect(() => {
    
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

  return (
    <>
    <div>
    <h1>User is interested in the following genres</h1>
    {
      
      uniqueGenres.map(genre => (
        
        <div key={genre}>{genre}</div>
        
        ))   
      }
    </ div>
    </>
  )
}

export default Genres