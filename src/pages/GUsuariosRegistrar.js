import React, { Component } from 'react'

import Layout from '../components/Layout'
import "../styles/button.scss"
import "../styles/input.scss"
import {  Modal } from 'reactstrap'
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';
import Select from 'react-select';
import { createHashHistory } from 'history'
import CheckICON from "../assets/check.svg"
const options = [
    { label: "Administrador I", value: 1 },
  { label: "Administrador II", value: 2 },
  { label: "Usuario A", value: 3 },
  { label: "Usuario B", value: 4 },
  { label: "Usuario C", value: 5 }
  ];
  const shortid = require('shortid');
export const history = createHashHistory()
export default class AgregarUsuario extends Component {
    constructor(props){
        super(props)
        this.state={
            Usuario: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
    }
    handleChangeSelect(e) {
        this.setState(
            {
                rol: e.label
            }
        )
      }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
      }
      agregar() {
        
        const obj = {
            Codigo: shortid.generate(),
            Nombre: this.state.nombre,
            Empresa: this.state.empresa,
            Username: this.state.username,
            Email: this.state.username,
            Rol: this.state.rol,
            RUC: this.state.ruc,
            Direccion: this.state.direccion
        };
       console.log(obj);
        axios.post('https://sislmp-upc.herokuapp.com/getUsuarios/save', obj)
            .then(
                res =>{
                    console.log(res);
                    if(res.data.message == "Nuevo registro agregado."){
                        this.toggle();
                        setTimeout(() => {
                            this.props.history.push('/Gusuarios/buscar');
                          }, 2000)
                    }else{
                        notify.show(res.data.message.message,5000);
                        setTimeout(() => {
                            this.props.history.push('/Gusuarios/buscar');
                          }, 2000)
                    }
            })
  }
    state={
         isOpen: false
    }
    onRegister(){
        alert("Registrar")
    }
    toggle(){
        const { isOpen } = this.state;
        this.setState({
             isOpen: ! isOpen
        })
    }
    componentDidMount(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    render() {
        const { isOpen } = this.state;
        return (
            <Layout { ...this.props }>
                <div>
                    <br />
                    <h5>Agregar usuario</h5>
                    <div className="row">
                        <div className="col-12">
                            <div className="border rounded mt-4" style={{padding: 20}}>
                                <p style={{margin: "10px 0 0 0"}}>Nombre:</p>
                                <input
                                    name="nombre"
                                    className="input-component"
                                    placeholder="Ejemplo: Manuel"
                                    onChange={this.handleChange}
                                    style={{margin: 0}}
                                    required
                                />
                                <p style={{margin: "10px 0 0 0"}}>Email:</p>
                                <input
                                    name="email"
                                    className="input-component"
                                    placeholder="Ejemplo: manuel@gmail.com"
                                    onChange={this.handleChange}
                                    style={{margin: 0}}
                                    type="email"
                                />
                                <p style={{margin: "10px 0 0 0"}}>Nombre de Usuario:</p>
                                <input
                                    name="username"
                                    className="input-component"
                                    placeholder="Ejemplo: manuelmaza"
                                    onChange={this.handleChange}
                                    style={{margin: 0}}
                                    type="email"
                                />
                                
                                <p style={{margin: "10px 0 0 0"}}>Rol:</p>
                                
                                <Select name="rol" 
                                        onChange={this.handleChangeSelect} 
                                        style={{margin: 0, height: 40}} 
                                        options={options}/>
                                <p style={{margin: "10px 0 0 0"}}>Ruc:</p>
                                <input
                                    name="ruc"
                                    className="input-component"
                                    onChange={this.handleChange}
                                    placeholder="Ejemplo: 1234400012"
                                    style={{margin: 0}}
                                    required
                                />
                                <p style={{margin: "10px 0 0 0"}}>Empresa:</p>
                                <input
                                    name="empresa"
                                    className="input-component"
                                    onChange={this.handleChange}
                                    placeholder="Ejemplo: Soluciones ABC"
                                    style={{margin: 0}}
                                    required
                                />
                                <p style={{margin: "10px 0 0 0"}}>Direccion:</p>
                                <input
                                    name="direccion"
                                    className="input-component"
                                    onChange={this.handleChange}
                                    placeholder="Ejemplo: Av 123"
                                    style={{margin: 0}}
                                    required
                                />
                                
                                
                                <button
                                    className="btn btn-blue"
                                    onClick={ () => this.agregar() }
                                    style={{margin: "30px 0 0 0"}}
                                >
                                    AGREGAR
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <Modal
                    isOpen={ isOpen }
                    toggle={ () => this.toggle()}
                    style={{
                        backgroundColor: "transparent"
                    }}
                >
                    <div
                        style={{
                            borderRadius: 20,
                            backgroundColor: "white",
                            padding: 50,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <p 
                        style={{
                            fontWeight: 500
                        }}>SE AGREGÓ DE MANERA SATISFACTORIA</p>
                        <img
                            src={
                                CheckICON
                            }
                            alt="checkicon"
                            style={{
                                width: 100,
                                marginTop: 30
                            }}
                        />
                    </div>
                </Modal>
            </Layout>
        )
    }
}
