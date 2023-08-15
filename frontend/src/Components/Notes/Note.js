import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

const Note = ({mouseDownEvent, mouseUpEvent, mouseMoveEvent}) => {
  return (
    <div onMouseDown={mouseDownEvent} onMouseMove={mouseMoveEvent} onMouseUp={mouseUpEvent}  >
      <Card
        sx={{
          textAlign: 'center',
          alignItems: 'center',
          width: 343,
          // to make the demo resizable
          '--icon-size': '100px',
        }}
      >
        <CardOverflow variant="solid" color="success">
          <AspectRatio
            variant="outlined"
            color="success"
            ratio="1"
            sx={{
              m: 'auto',
              transform: 'translateY(50%)',
              borderRadius: '50%',
              width: 'var(--icon-size)',
              boxShadow: 'sm',
              bgcolor: 'background.surface',
              position: 'relative',
            }}
          >
            <div>
              <BakeryDiningIcon color="success" sx={{ fontSize: '4rem' }} />
            </div>
          </AspectRatio>
        </CardOverflow>
        <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
          Title
        </Typography>
        <CardContent sx={{ maxWidth: '40ch' }}>
          You just gain one Cookhat for Salad cooking. Share your achievement with your
          friends.
        </CardContent>
        <CardActions
          orientation="vertical"
          buttonFlex={1}
          sx={{
            '--Button-radius': '40px',
            width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
          }}
        >
          <Button variant="solid" color="success">
            Share
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default Note