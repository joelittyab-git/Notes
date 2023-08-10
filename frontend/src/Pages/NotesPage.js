import React from 'react'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import './Stylesheets/NotesPage.css';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { styled } from '@mui/system';
import NewNoteForm from '../Components/Notes/NewNoteForm';
import Client from '../Base/Api/BaseClient'


const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const GreyThemedTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: '#f2f2f2', // Grey background color
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'grey', // Grey border color
    },
  },
}));

const NotesPage = () => {

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

  const saveNote = (event) => {
    
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
      <NewNoteForm onClick={toggleNewNote} showNewNote={showNewNote}/>
{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

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