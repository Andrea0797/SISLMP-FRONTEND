import React, { Component } from 'react'

import { NavLink } from "react-router-dom";

import "./Sidebar.scss"
import ICON_HOME from "../assets/Home.svg"
import ICON_CONSULTAR from "../assets/Consultar.svg"
import ICON_VALIDAR from "../assets/Validar.svg"
import ICON_GESTIONAR from "../assets/Gestionar.svg"
import ICON_USER from "../assets/User.svg"
import ICON_LOGOUT from "../assets/logout.svg"

export default class Sidebar extends Component {
    onLogout( e ){
        e.preventDefault()
        this.props.history.push( "/" )
    }
    render() {
        return (
            <div className={ `sidebar-component ${ this.props.classes }` }>
                <NavLink to="/inicio">
                    <img src={ ICON_HOME } alt="imageicon"/>
                    INICIO
                </NavLink>
                <NavLink to="/consultar">
                    <img src={ ICON_CONSULTAR} alt="imageicon"/>
                    CONSULTAR MEDICAMENTOS
                </NavLink>
                <NavLink to="/transacciones">
                    <img src={ ICON_VALIDAR } alt="imageicon"/>
                    VALIDAR TRANSACCIONES
                </NavLink>
                <NavLink to="/medicamentos">
                    <img src={ ICON_GESTIONAR } alt="imageicon"/>
                    GESTIONAR MEDICAMENTOS
                </NavLink>
                <NavLink to="/usuarios">
                    <img src={ ICON_USER } alt="imageicon"/>
                    GESTIONAR USUARIOS
                </NavLink>

                <NavLink to="/usuarios" onClick={ ( e ) => this.onLogout( e ) }>
                    <img src={ ICON_LOGOUT } alt="imageicon"/>
                    CERRAR SESIÓN
                </NavLink>
            </div>
        )
    }
}
