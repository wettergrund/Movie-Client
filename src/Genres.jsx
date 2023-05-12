import React, { useEffect, useState } from 'react'

import { styled  , keyframes } from 'styled-components'
import { useParams } from "react-router-dom";

const Genres = (p) => {

let { id } = useParams();

const [genres, setGenres] = useState([])
// const [user, setUser] = useState([0])


// useEffect(() => {
//     // console.log("effect")
//     // console.log(person)
//     if (id !== 0) {
//         const temp = p.user.filter(obj => obj.id == id);

        
//         setUser(temp[0]);
        
    

//     }
//   }, [id])


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

  
//   console.log(user);
  return (
    // <div>Genres</div>
    <>

    {
     genres.map(genre => (
        
        <div key={genre.title}>{genre.title}</div>
        
        
     ))   
    }
    </>
  )
}

export default Genres