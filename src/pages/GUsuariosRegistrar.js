import React, { Component } from 'react'

import Layout from '../components/Layout'
import "../styles/button.scss"
import "../styles/input.scss"
import {  Modal } from 'reactstrap'
import CheckICON from "../assets/check.svg"

export default class AgregarUsuario extends Component {
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
                                    className="input-component"
                                    placeholder="Ejemplo: Manuel"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Email:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: manuel@gmail.com"
                                    style={{margin: 0}}
                                    type="email"
                                />
                                
                                <p style={{margin: "10px 0 0 0"}}>Rol:</p>
                                <select
                                    className="input-component"
                                    placeholder="Ejemplo: 123-000k32"
                                    style={{margin: 0, height: 40}}
                                >
                                    <option>Seleccione un rol</option>
                                    <option>Administrador I</option>
                                    <option>Administrador II</option>
                                    <option>Administrador III</option>
                                    <option>Usuario</option>
                                </select>
                                <p style={{margin: "10px 0 0 0"}}>Ruc:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: 1234400012"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Direccion:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: Av 123"
                                    style={{margin: 0}}
                                />
                                
                                
                                <button
                                    className="btn btn-blue"
                                    onClick={ () => this.toggle() }
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
