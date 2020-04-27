import React, { Component } from 'react'
import AuthService from '../components/AuthService';
import { createHashHistory } from 'history'

import "./Login.scss"
import "../styles/button.scss"
import "../styles/input.scss"
import { Link } from 'react-router-dom';

export const history = createHashHistory()

export default class Login extends Component {

    constructor(props,history){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
        this.state = {
            message: '',

        }
    }

    componentWillMount(){
        if(this.Auth.loggedIn())
            history.push('/');
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    redirect(){
        localStorage.setItem("Sin Cuenta",1);
        this.props.history.push('/consultar');
    }
    handleFormSubmit(e){
        e.preventDefault();
      
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
                this.setState({ message: res.message });
                setTimeout(() => {
                    history.push('/');
                  }, 2000)
            })
            .catch(err =>{
                console.log(err);
                this.setState({ message: err.message });
            })
    }
    alertSuccess(){
        if(this.state.message ){
            return(
                <div className="alert alert-info" role="alert"
                    style = {{ 
                        position: "absolute",
                        top: 10
                    }}
                >
                    { this.state.message }

                </div>
            
            )
        }
    }
    onLogin(){
        //this.props.history.push("/inicio")
        
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
                this.setState({ message: res.message });
                if(res.message == "Se ha logueado exitosamente"){
                    setTimeout(() => {
                        this.props.history.push('/inicio');
                      }, 2000)
                }
            })
            .catch(err =>{
                console.log(err);
                this.setState({ message: err.message });
            })
    }
    render() {
        return(
            <React.Fragment>
                <div className="login-component">
                   {this.alertSuccess()}
                    <form className="login-component__container" onSubmit={this.handleFormSubmit}>
    
                    <p>Bienvenidos al sistema de consulta de medicamentos</p>
                    <input
                        placeholder="Usuario"
                        name="username"
                        className="input-component"
                        onChange={this.handleChange}
                        required
                     />
                     <input
                        type="password"
                        placeholder="Contraseña"
                        className="input-component"
                        name="password"
                        onChange={this.handleChange}
                        required
                     />
                     <button
                         className="btn btn-blue"
                         style={{width: "100%"}}
                         onClick={ () => this.onLogin() }
                     >
                         INGRESAR
                     </button>
                     <Link onClick={() => this.redirect()} style={{color: '#339CB9',marginTop:20}} a> Ingresar sin cuenta</Link>
                    </form>   
                </div>   
            </React.Fragment>    
            )
        // return (
            
        //     <div className="login-component">
        //         <div className="login-component__container">
        //             <p>Bienvenidos al sistema de consulta de medicamentos</p>
        //             <input
        //                 placeholder="Usuario"
        //                 className="input-component"
        //             />
        //             <input
        //                 placeholder="Contraseña"
        //                 className="input-component"
        //             />
        //             <button
        //                 className="btn btn-blue"
        //                 style={{width: "100%"}}
        //                 onClick={ () => this.onLogin() }
        //             >
        //                 INGRESAR
        //             </button>
        //         </div>
        //     </div>
        // )
    }
}
