import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Cards from './Cards';

const Suggestion = ({data}) => {
let { id } = useParams();

console.log("Sug");

console.log(data);
// const [data, setData] = useState([]);

// useEffect(({sug})=>{
      
    // fetch(`https://localhost:7107/API/movies/suggestion/` 
    // + id)
    // .then((res) => res.json())
    // .then((json) => setData(json.results))
    
    // },[])

    // console.log(data);

  return (
    <div>
        <Cards data={data} />
    </div>
  )
}

export default Suggestion