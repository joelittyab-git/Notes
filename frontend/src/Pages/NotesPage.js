import React from 'react'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import './Stylesheets/NotesPage.css';
import {useEffect} from 'react';

const NotesPage = () => {
  const createNewNote = () => {
    console.log("Create new note");
  }

  return (
    <div>
      <div className="add-button">
        <IconButton onClick={createNewNote} sx={{backgroundColor:"#1976D2", ":hover":{backgroundColor:"transparent"}}}>
          <AddIcon fontSize="large" htmlColor="black" sx={{":hover":{color:"#1976D2"}}}/>
        </IconButton>
      </div>
    </div>
  )
}

export default NotesPage