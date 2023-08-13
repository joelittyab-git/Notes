import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Stylesheets/OffCanvas.css'

function OffCanvas({visibilityStatus, setVisibilityStaus}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <Offcanvas show={visibilityStatus} onHide={()=>setVisibilityStaus(false)} data-bs-theme="dark">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Offcanvas
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;