import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";


const AddMovie = ({user, id}) => {
    // let { id } = useParams();
    const [userDetails, setUserDetails] = useState([0])
    const [name, setName] = useState("Unknown");


    useEffect(() => {
        // console.log("effect")
        // console.log(person)
        if (id !== 0) {
            const temp = user.user.filter(obj => obj.id == id);
    
            
            setUserDetails(temp[0]);
            
        
     
        }
      }, [id])


      useEffect(() => {
        console.log("Details")
        console.log(userDetails)
        setName(userDetails.name)
        
      }, [userDetails])


    console.log(userDetails)

    
    // const [user, setUser] = useState([0])

    // useEffect(() => {
    //     // console.log("effect")
    //     // console.log(person)
        
    //     if (id !== 0) {
    //         console.log(props.user)
    //         const temp = props.user.filter(obj => obj.id == props.id);
    
            
    //         setUser(temp[0]);
            
        
    
    //     }
            
        
    
        
    //   }, [id])
        
  return (
    <>
    {/* <p>Sök på en film du vill lägga till {user}</p> */}
    <div>Lägg till film för {name} </div>
    
    </>
  )
}

export default AddMovie