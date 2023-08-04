import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import NotesPage from './Pages/NotesPage';
import NavBar from './Commons/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/user/login' Component={LoginPage} />
        <Route path='/notes' Component={NotesPage} />
        <Route path='/navbar' Component={NavBar}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

