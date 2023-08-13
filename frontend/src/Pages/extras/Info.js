import React from 'react'
import BaseClient from '../../Base/Api/BaseClient'
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content


const Info = () => {

     const buttonClick = () => {
          const root = createRoot(document.getElementById('note-expand'));
          root.render(<h1 color='white' style={{color:"white"}}>Hello, world</h1>);
     }

  return (
    <div>
          <button onClick={buttonClick}>
               Click me
          </button>
    </div>
  )
}

export default Info