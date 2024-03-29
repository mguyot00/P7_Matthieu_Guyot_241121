import React from 'react';
import {Redirect} from 'react-router-dom';

class Signup extends React.Component {

    state = { redirection: false }

    constructor (props) {
        super(props)
        this.state = {
            firstname: undefined || '',
            lastname: undefined || '',
            email: undefined || '',
            password: undefined || '',
            errors: {
                firstname: undefined || '',
                lastname: undefined || '',
                email: undefined || '',
                password: undefined || '',
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleChange (e) {
        e.preventDefault();
        const name = e.target.name;
        const value =  e.target.value;
        let errors = this.state.errors;

        const validEmailRegex = RegExp(/^(([^<>()[\].,;:s@"]+(.[^<>()[\].,;:s@"]+)*)|(".+"))@(([^<>()[\].,;:s@"]+.)+[^<>()[\].,;:s@"]{2,})$/i);

        switch (name) {
            case 'firstname': 
              errors.firstname = 
                value.length < 3
                  ? 'Votre prénom doit contenir 3 lettres minimum.'
                  : '';
              break;
              case 'lastname': 
              errors.lastname = 
                value.length < 2
                  ? 'Votre nom doit contenir 2 lettres minimum.'
                  : '';
              break;
            case 'email': 
              errors.email = 
                validEmailRegex.test(value)
                  ? ''
                  : 'Veuillez entrer un email valide (ex : groupomania@mail.com).';
              break;
            case 'password': 
              errors.password = 
                value.length < 6
                  ? 'Votre mot de passe doit contenir au minimum 6 caractéres.'
                  : '';
              break;
            default:
              break;
          }

        this.setState({
            errors,
            [name]: value
        })
    }

    handleSubmit (e) {
        e.preventDefault()

        const validateForm = (errors) => {
            let valid = true;
            Object.values(errors).forEach(
                (val) => val.length > 0 && (valid = false)
            );
            return valid;
            }

        if(validateForm(this.state.errors)) {
            console.info('Formulaire valide !')
            console.log(this.state)
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer token' 
                },
                body: JSON.stringify(this.state)
            };
    
            fetch('http://localhost:8080/api/auth/signup/', requestOptions)
                .then(response => response.json())
                .then((response) => {
                    if (response.error) { 
                        alert("Erreur : " + response.error); 
                    } else { 
                        this.setState({ redirection: true })
                        alert("Votre compte à bien été créé ! Connectez-vous pour accéder aux derniers échanges.")
                    }
                })
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    alert("Veuillez remplir l'ensemble des champs demandés.")
                    console.error('Il y a eu une erreur :', error);
                });

          } else {
            alert('Formulaire non valide ! Veuillez ressaisir vos données.')
          }
    }

    render() {
        const { redirection } = this.state;
        if (redirection) {
            return <Redirect to='/login'/>;
        }

        const {errors} = this.state;

        return <React.Fragment>
            <div className="container_home">
                <h1>Inscrivez-vous au réseau social de votre entreprise </h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input type="text" value={this.state.firstname} onChange={this.handleChange} name="firstname" className="form-control" required noValidate/>
                        {errors.firstname.length > 0 && 
                            <span className='error'>{errors.firstname}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Nom</label>
                        <input type="text" value={this.state.lastname} onChange={this.handleChange} name="lastname" className="form-control" required noValidate/>
                        {errors.lastname.length > 0 && 
                            <span className='error'>{errors.lastname}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email" className="form-control" required noValidate/>
                        {errors.email.length > 0 && 
                            <span className='error'>{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" value={this.state.password} onChange={this.handleChange} name="password" className="form-control" required noValidate/>
                        {errors.password.length > 0 && 
                            <span className='error'>{errors.password}</span>}
                    </div>
                    <div className="form-submit">
                        <button className="btn btn-info" onClick={this.handleSubmit} noValidate>Envoyer</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    };
};

export default Signup;