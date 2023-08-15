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
  
  const navigate = useNavigate();

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
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: "9" }}
        open={showNewNote}
        onClick={toggleNewNote}
      >
        <div style={{width:"80%", position:"absolute", top:"50%",height:"85%" , left:"50%", transform:"translate(-50%, -50%)", backdropFilter:"opacity",zIndex:100}} onClick={event=>event.stopPropagation()}>
          <Card sx={{width:"100%",height:"100%", backgroundColor:"#FAFAFA"}}>
            <CardContent>
              <div className="top" style={{display:'flex', justifyContent:"center", width:"100%"}}>

                <FormControl sx={{width:"100%", display:"flex", justifyContent:"center"}}>

                  <FormLabel>Title</FormLabel>
                  <Input placeholder="Example: Dinner Menu...." />
                  <FormHelperText>Enter the title of the note here</FormHelperText><br />

                  <FormLabel>Body</FormLabel>
                  <Textarea placeholder="Example:  1. Carrot curry..." minRows={10} sx={{width:"90%"}}/>
                  <FormHelperText sx={{paddingBottom:"50px"}}>Enter the note content here</FormHelperText>

                  <FormControlLabel
                    control={
                      <Switch name="reminder" />
                    }
                    label="Set Reminder"
                  />

                </FormControl>
              </div>
              <div className='south' style={{display:"flex", justifyContent:"center"}}>
                  <Button startDecorator={<SaveIcon/>} size="md" sx={{width:"100px", position:'absolute', bottom:15}}>Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Backdrop> */}
      <NewNoteForm onClick={toggleNewNote} showNewNote={showNewNote} saveNoteButtonHandler={saveNote} formData={formData} setFormData={setFormData}/>
{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

{/* -----------------------------------------------------------------Dislay-notes----------------------------------------------------------------------------------------- */}
      <Note/>
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

export default NotesPage