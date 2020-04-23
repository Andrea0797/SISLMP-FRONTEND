import React, { Component } from 'react'

import Layout from '../components/Layout'
import "../styles/button.scss"
import "../styles/input.scss"
import { Input, Modal } from 'reactstrap'
import CheckICON from "../assets/check.svg"

export default class GestionarMedicamentos extends Component {
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
                    <h5>Registrar medicamentos</h5>
                    <div className="row">
                        <div className="col-12">
                            <div className="border rounded mt-4" style={{padding: 20}}>
                                <p style={{margin: "10px 0 0 0"}}>Nombre comercial:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: Dukoral"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Nombre genérico:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: Dukoral premium"
                                    style={{margin: 0}}
                                />
                                
                                <p style={{margin: "10px 0 0 0"}}>Lote:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: 120-0000012"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Forma farmacéutica:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: pastillas"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Rubro:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: cardiovascular"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Fecha de vencimiento:</p>
                                
                                <Input
                                    style={{
                                        backgroundColor: "#F8F8F8",
                                        border: "none"
                                    }}
                                    type="date"
                                    name="date"
                                    placeholder="fecha de vencimiento"
                                    />
                                <p style={{margin: "10px 0 0 0"}}>Archivos:</p>
                                <input
                                className="input-component" 
                                style={{margin: 0}}
                                    type="file"
                                />
                                <input
                                    className="input-component"
                                    style={{margin: 0}}
                                    type="file"
                                />
                                <input
                                    className="input-component"
                                    style={{margin: 0}}
                                    type="file"
                                />
                                <button
                                    className="btn btn-blue"
                                    onClick={ () => this.toggle() }
                                    style={{margin: "30px 0 0 0"}}
                                >
                                    REGISTRAR
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
                        }}>SE REGISTRÓ DE MANERA SATISFACTORIA</p>
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
