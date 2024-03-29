import React from 'react';
import {Link} from 'react-router-dom';


const Home = () => {
    return (
        <React.Fragment>
            <div className="container_home">
          
                <h1>Bienvenue sur le reseau social de Groupomania </h1>
                <p><Link to="/login">Connectez-vous</Link> au réseau social de Groupomania pour communiquer avec vos collégues ! <br />
                Si vous n'avez pas encore de compte, <Link to="/signup">inscrivez-vous ici</Link> !</p>
            </div>
        </React.Fragment>
    );
}

export default Home;