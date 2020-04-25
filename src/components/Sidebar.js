import React, { Component } from 'react'

import { NavLink } from "react-router-dom";

import "./Sidebar.scss"
import ICON_HOME from "../assets/Home.svg"
import ICON_CONSULTAR from "../assets/Consultar.svg"
import ICON_VALIDAR from "../assets/Validar.svg"
import ICON_GESTIONAR from "../assets/Gestionar.svg"
import ICON_USER from "../assets/User.svg"
import ICON_LOGOUT from "../assets/logout.svg"
import ICON_Left from "../assets/Left.svg"
import AuthService from '../components/AuthService';

export default class Sidebar extends Component {
    state={
        isShowedUser: true,
        isShowedMed: true,
        rolUsuario:""
    }
    constructor(props,history){
        super(props)
        this.Auth = new AuthService();
    }
    componentDidMount(){
        this.setState( {
            rolUsuario: localStorage.getItem("Sin Cuenta") == 1 ? "" : this.Auth.getProfile().rol
        })
        console.log(localStorage.getItem("Sin Cuenta"));
    }
    onLogout( e ){
        e.preventDefault()
        localStorage.setItem("Sin Cuenta",0);
        this.Auth.logout();
        this.props.history.push( "/" )
    }
    prevent( e ){
        e.preventDefault()

    }
    toggleUsers(e){
        e.preventDefault()
        const { isShowedUser } = this.state;
        console.log("isShowed", !isShowedUser )
        this.setState( {
            isShowedUser: !isShowedUser
        })
    }
    toggleMed( e ){
        e.preventDefault()
        const {isShowedMed } = this.state;
        console.log("isShowedMed", !isShowedMed )
        this.setState( {
            isShowedMed: !isShowedMed
        })
    }
    render() {
        const { isShowedUser, isShowedMed,rolUsuario } = this.state;
        return (
            <div className={ `sidebar-component ${ this.props.classes }` }>
                
                <NavLink to="/inicio">
                    <img src={ ICON_HOME } alt="imageicon"/>
                    INICIO
                </NavLink>
                <NavLink to="/consultar" style={{
                        display:  rolUsuario == "Administrador I"  ? "none" : "block"
                    }}>
                    <img src={ ICON_CONSULTAR} alt="imageicon"/>
                    CONSULTAR MEDICAMENTOS
                </NavLink>
                <NavLink to="/transacciones" 
                    style={{
                        display:  rolUsuario == "Administrador II" || rolUsuario == "Usuario A"  
                        || rolUsuario == "Usuario B" ? "block" : "none"
                    }}>
                    <img src={ ICON_VALIDAR } alt="imageicon"/>
                    VALIDAR TRANSACCIONES
                </NavLink>
                <NavLink to="/medicamentos" onClick={ ( e ) => this.toggleMed( e ) }
                    style={{borderTop: "solid 1px white",
                    display:  rolUsuario == "Administrador II" || rolUsuario == "Usuario A"  ? "block" : "none"
                    }}
                >
                    <img src={ ICON_GESTIONAR } alt="imageicon"/>
                    GESTIONAR MEDICAMENTOS
                    <img
                        src={ ICON_Left }
                        alt="icontoggle"
                        className={ isShowedMed ? "iconflecha isactive" : "iconflecha" }
                    />
                </NavLink>
                <div className={  isShowedMed ? "container-toggled isactive" : "container-toggled" }>
                    <NavLink to="/medicamentos/registrar" className="childlink"
                    style={{
                        display:  rolUsuario == "Usuario A" || rolUsuario == "Administrador II" ? "block" : "none"
                    }}>
                        <img src={ ICON_GESTIONAR } alt="imageicon"/>
                        REGISTRAR MEDICAMENTOS
                    </NavLink>
                    <NavLink to="/medicamentos/buscar" className="childlink"
                    style={{borderTop: "solid 1px white",
                    display:  rolUsuario == "Administrador II"  ? "block" : "none"
                    }}
                >
                        <img src={ ICON_GESTIONAR } alt="imageicon"/>
                        BUSCAR MEDICAMENTOS
                    </NavLink>
                </div>
                <NavLink to="/Gusuarios/buscar" onClick={ ( e ) => this.toggleUsers( e ) }
                style={{borderTop: "solid 1px white",
                display:  rolUsuario == "Administrador I"  ? "block" : "none"
            }}
                    
                >
                    <img src={ ICON_USER } alt="imageicon"/>
                    GESTIONAR USUARIOS
                    <img
                        src={ ICON_Left }
                        alt="icontoggle"
                        className={   isShowedUser ? "iconflecha isactive" : "iconflecha" }
                    />
                </NavLink>
                
                <div className={  isShowedUser ? "container-toggled isactive" : "container-toggled" }>
                    <NavLink to="/Gusuarios/buscar" className="childlink"
                    style={{borderTop: "solid 1px white",
                    display:  rolUsuario == "Administrador I"  ? "block" : "none"
                }}
                    >
                        <img src={ ICON_USER } alt="imageicon"/>
                        BUSCAR USUARIOS
                    </NavLink>
                    <NavLink to="/Gusuarios/agregar" className="childlink"
                    style={{borderTop: "solid 1px white",
                    display:  rolUsuario == "Administrador I"  ? "block" : "none"
                }}
                    >
                        <img src={ ICON_USER } alt="imageicon"/>
                        AGREGAR USUARIOS
                    </NavLink>
                </div>
                <NavLink to="/usuarios" onClick={ ( e ) => this.onLogout( e ) }>
                    <img src={ ICON_LOGOUT } alt="imageicon"/>
                    CERRAR SESIÓN
                </NavLink>
            </div>
        )
    }
}
