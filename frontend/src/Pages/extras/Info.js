import React from 'react'
import BaseClient from '../../Base/Api/BaseClient'

const Info = () => {

     const buttonClick = async() =>{
          const response = await BaseClient.delete('user/auth/',{
               headers:{
                    Authorization:"Token 58edc40ca5457d20c671f55c5cd7d3704d797c13"
               }
          }
          );
          console.log(response);
     }

  return (
    <div>
     <button onClick={buttonClick}></button>
    </div>
  )
}

export default Info