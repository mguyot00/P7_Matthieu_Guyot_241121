//imports
import React from 'react';
import {BrowserRouter as Router, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Routes from './components/Routes';
import AuthApi from './components/AuthApi';
import img from './images/icon.png';


//import CSS & bootsrapreact
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav"; 
import './css/App.css';

// Composant App
function App() {
  const [auth, setAuth] = React.useState(false);

  // gestion des cookies
  const readCookie = () => {
    const user = Cookies.get("user");
    if(user) {
      setAuth(true);
    }
  }

  React.useEffect(() => {
    readCookie();
  }, [])

  // Gestion de la NavBar
  let navLink;
  if (auth === true) {
      const userLog = JSON.parse(localStorage.getItem('userConnect'));
      const userId = userLog.userId;

      navLink = <>
              <Nav className="mr-auto">
                  <Link to="/articles" className="nav-link">Fil d'actualité</Link>
                  <Link to={"/user/" + userId } className="nav-link">Mon compte</Link>
              </Nav>
            </>
  } else {
      navLink = <Nav className="mr-auto">
              <Link to="/signup" className="nav-link">S'inscrire</Link>
              <Link to="/login" className="nav-link">Se connecter</Link>
          </Nav>
  }

  return (
    <React.Fragment>
      <AuthApi.Provider value={{auth, setAuth}}>
        <Router>
          <Navbar sticky="top" bg="info" variant="dark">
              <Link to="/" className="logo"><img src={img} alt="logo" className='logo' /></Link>
              {navLink}
          </Navbar>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </React.Fragment>
  );
}

export default App;