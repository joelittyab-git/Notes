import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/material/TextField';
import { useEffect , useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Input from '@mui/joy/Input';
import { styled } from '@mui/system';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import SaveIcon from '@mui/icons-material/Save';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const NewNoteForm = ({onClick, showNewNote, saveNoteButtonHandler, formData, setFormData}) => {

  const formChangeHandler = event => {
    if(event.target.name ==='title-input'){
      setFormData({...formData, title:event.target.value});
    }else if(event.target.name === "body-input"){
      setFormData({...formData, body:event.target.value});
    }
  }  

  return (
    <div>
     <Backdrop
        sx={{ color: '#fff', zIndex: "9" }}
        open={showNewNote}
        onClick={onClick}
      >
        <div style={{width:"80%", position:"absolute", top:"50%",height:"85%" , left:"50%", transform:"translate(-50%, -50%)", backdropFilter:"opacity",zIndex:100}} onClick={event=>event.stopPropagation()}>
          <Card sx={{width:"100%",height:"100%", backgroundColor:"#FAFAFA"}}>
            <CardContent>
              <div className="top">

                <FormControl sx={{width:"100%", display:"flex", justifyContent:"center"}}>

                  <FormLabel>Title</FormLabel>
                  <Input placeholder="Example: Dinner Menu...." onChange={formChangeHandler} name='title-input'/>
                  <FormHelperText>Enter the title of the note here</FormHelperText><br />
                
                </FormControl>

                <FormControl sx={{width:"100%", display:"flex", justifyContent:"center"}}>

                  <FormLabel>Body</FormLabel>
                  <Textarea placeholder="Example:  1. Carrot curry..." minRows={10} sx={{width:"90%"}} onChange={formChangeHandler} name='body-input'/>
                  <FormHelperText sx={{paddingBottom:"50px"}}>Enter the note content here</FormHelperText>

                </FormControl>

                <FormControl>

                  <FormControlLabel
                    control={
                      <Switch name="reminder" />
                    }
                    label="Set Reminder"
                  />

                </FormControl>
              </div>
              <div className='south' style={{display:"flex", justifyContent:"center"}}>
                  <Button startDecorator={<SaveIcon/>} onClick={saveNoteButtonHandler} size="md" sx={{width:"100px", position:'absolute', bottom:15}}>Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Backdrop>
    </div>
  )
}

export default NewNoteForm;