import React, { useEffect, useState } from 'react'

const ListUsers = () => {

    const [data, setData] = useState([])

    useEffect(()=>{
      
      fetch(`https://localhost:7107/API/users/all`)
      .then((res) => res.json())
      .then((json) => setData(json))
      
      },[])
  

  return (

    <>
    {
        data.map((user, index) => (
            <dir key={index}>


          <dir>{user.name} "test"</dir>
          <dir>{user.email}</dir>

          </dir>

        ))

}
</>
  )
}

export default ListUsers