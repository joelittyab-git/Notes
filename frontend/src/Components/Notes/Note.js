import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import {
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";
import { MoreVert, Delete, Edit } from "@mui/icons-material";
import moment from "moment";

  


const Note = () => {

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

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  return (
    <div>
      <Card sx={{ position: "relative", height: "100%" }} fullWidth>
      <CardHeader
        sx={{ position: "absolute", right: 0, zIndex: 1 }}
        disableTypography
        action={
          <div>
            
              <>
                <IconButton
                  onClick={() => upddateNoteFavorite()}
                  disabled={favoriteButtonDisabled}
                  sx={{ color: isLiked ? "red" : "gray" }}
                  size="small"
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    setMenuOpened(true);
                    setAnchor(e.currentTarget);
                  }}
                >
                  <MoreVert />
                </IconButton>
              </>

            <Menu
              id="basic-menu"
              anchorEl={anchor}
              open={menuOpened}
              onClose={() => setMenuOpened(false)}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={() => {
                  setIsEdit(!isEdit);
                  setMenuOpened(false);
                }}
              >
                <Edit sx={{ mr: 2 }} /> Edit
              </MenuItem>
              <MenuItem onClick={() => deleteNoteOnClick(note._id)}>
                <Delete sx={{ mr: 2 }} /> Delete
              </MenuItem>
            </Menu>
          </div>
        }
      />
      <CardContent justifyContent="space-between" sx={{ height: "100%" }}>
        {!isEdit ? (
          <Typography
            noWrap
            gutterBottom
            variant="h5"
            component="div"
            sx={{ mr: "70px" }}
          >
            {noteTitle}
          </Typography>
        ) : (
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            variant="outlined"
            label="Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        )}
        {!isEdit ? (
          <>
            <Grid container flexDirection="column" sx={{ height: "100%" }}>
              <Typography
                variant="body2"
                gutterBottom
                color="text.secondary"
                sx={{
                  minHeight: 350,
                  maxHeight: 350,
                  overflowY: "scroll",
                  mb: "36px",
                }}
              >
                {noteContent}
              </Typography>
              <Box sx={{ position: "absolute", bottom: "12px", left: "12px" }}>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ color: "text.disabled" }}
                >
                  {getTime(note.updatedAt)}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ color: "text.disabled" }}
                >
                  {getDate(note.updatedAt)}
                </Typography>
              </Box>
            </Grid>
          </>
        ) : (
          <TextField
            sx={{ maxHeight: 350, overflowY: "scroll", pt: 1 }}
            fullWidth
            variant="standard"
            label="Content"
            multiline
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        )}
        {isEdit && (
          <LoadingButton
            sx={{
              mt: 2,
            }}
            fullWidth
            loading={buttonDisabled}
            variant="outlined"
            size="medium"
            onClick={() => editedNote()}
          >
            Save
          </LoadingButton>
        )}
      </CardContent>
    </Card>
    </div>
  )
}

export default Note