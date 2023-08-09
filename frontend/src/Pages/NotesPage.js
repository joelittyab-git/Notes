import React from 'react'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import './Stylesheets/NotesPage.css';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/material/TextField';
import { useEffect , useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import  TextareaAutosize  from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

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

  const [showNewNote, setShowNewNote] = useState(false);

  const createNewNote = () => {
    console.log("Create new note");
  }
  const toggleNewNote = () =>{
    setShowNewNote(!showNewNote);
  }

  return (
    <div>
{/*--------------------------------------------------------New-note-dialogue-box------------------------------------------------------------------------------------ */}
      <Backdrop
        sx={{ color: '#fff', zIndex: "9" }}
        open={showNewNote}
        onClick={toggleNewNote}
      >
        <div style={{width:"80%", position:"absolute", top:"50%",height:"70%" , left:"50%", transform:"translate(-50%, -50%)", backdropFilter:"opacity",zIndex:100}} onClick={event=>event.stopPropagation()}>
          <Card sx={{width:"100%",height:"100%", backgroundColor:"#FAFAFA"}}>
            <CardContent>
              <div className="top" style={{display:'flex', justifyContent:"center"}}>
              <GreyThemedTextField
                label="Grey Themed Input"
                multiline
                rows={4}
                variant="outlined"
              />
              </div>
            </CardContent>
          </Card>
        </div>
      </Backdrop>
{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <div className="add-button">
        <IconButton onClick={toggleNewNote} sx={{backgroundColor:"#1976D2", ":hover":{backgroundColor:"transparent"}}}>
          <AddIcon fontSize="large" htmlColor="black" sx={{":hover":{color:"#1976D2"}}}/>
        </IconButton>
      </div>
    </div>
  )
}

export default NotesPage