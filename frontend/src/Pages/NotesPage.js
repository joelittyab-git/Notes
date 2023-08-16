import React from 'react'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import './Stylesheets/NotesPage.css';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import NewNoteForm from '../Components/Notes/NewNoteForm';
import BaseClient from '../Base/Api/BaseClient';
import {useNavigate} from 'react-router-dom';
import Note  from  "./../Components/Notes/Note"



const NotesPage = () => {

  let arr = [1,2];
  
  //initilization
  const navigate = useNavigate();

  //note dragger event handlers
  let offSetX, offSetY;
  let isDragging = false;
  let element;
  const mouseDownEvent = (e) => {
    isDragging = true;
    element = e.target;
    offSetX = e.clientX - element.getBoundingClientRect().left;
    offSetY = e.clientY - element.getBoundingClientRect().top;
    element.style.cursor = 'grabbing';

  }

  const mouseUpEvent = (e) => {
    isDragging = false;
    element.style.cursor = 'grab';
  }
  
  const mouseMoveEvent = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - offSetX;
    const newY = e.clientY - offSetY;

    element.style.left = `${newX}px`;
    element.style.top = `${newY}px`;
  }

  //efect to redirect to login page if note logged in
  useEffect(
    ()=>{
      try{
        const token = localStorage.getItem('Authorization');
        if(token===null||token==undefined){
          navigate('/user/login');
        }
      }catch(e){
        navigate('/user/login');
      }
    },
    []
  );

  //Button states
  const [showNewNote, setShowNewNote] = useState(false);

  //Form states
  const [formData, setFormData] = useState({
    title:"",
    body:"",
    remind:false
  })

  //Button actions
  const createNewNote = () => {
    console.log("Create new note");
  }
  const toggleNewNote = () =>{
    setShowNewNote(!showNewNote);
  }

  const saveNote = async(event) => {
    //POST data for new note creation
    const postForm = {
      "title":formData.title,
      "body":formData.body,
      "reminder":formData.remind
    };

    const response = await BaseClient.post('notes/',postForm);
    console.log(response);
  }

  return (
    <div>
{/*--------------------------------------------------------New-note-dialogue-box------------------------------------------------------------------------------------ */}
      <NewNoteForm onClick={toggleNewNote} showNewNote={showNewNote} saveNoteButtonHandler={saveNote} formData={formData} setFormData={setFormData}/>
{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

{/* -----------------------------------------------------------------Dislay-notes----------------------------------------------------------------------------------------- */}

        <div className="note-row" style={{display:"flex", gap:"50px", justifyContent:"center", paddingBottom:"50px", paddingTop:"40px"}}>
          <Note mouseDownEvent={mouseDownEvent} mouseUpEvent={mouseUpEvent} mouseMoveEvent={mouseMoveEvent}/>
        </div>
{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

{/* ----------------------------------------------------Add-Note-button--------------------------------------------------------------------------------------- */}
      <div className="add-button">
        <IconButton onClick={toggleNewNote} sx={{backgroundColor:"#1976D2", ":hover":{backgroundColor:"transparent"}}}>
          <AddIcon fontSize="large" htmlColor="black" sx={{":hover":{color:"#1976D2"}}}/>
        </IconButton>
      </div>
    </div>
  );
}

export default NotesPage;