import React, { Component } from 'react'

import Layout from '../components/Layout'
import "../styles/button.scss"
import "../styles/input.scss"
import { Table, Modal } from 'reactstrap'


export default class BuscarUsuarios extends Component {
    state={
        items:[
            {
                name: "Manuel Maza",
                code: "u1223",
                date: "12/09/2019",
                rol: "administrador I"
            },
            {
                name: "Ricardo García",
                code: "u12332",
                date: "12/09/2019",
                rol: "administrador II"
            },
            {
                name: "Carlos Rios",
                code: "u1222",
                date: "12/09/2019",
                rol: "usuario"
            },
        ],
        isOpen: false
    }
    componentDidMount(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    onSearch(){
        alert("Buscar")
    }
    toggle(){
        const { isOpen } = this.state;
        this.setState({
             isOpen: ! isOpen
        })
    }
    render() {
        const { items } = this.state
        return (
            <Layout { ...this.props }>
                <div>
                    <br />
                    <h5>Buscar usuarios</h5>
                    <div className="row">
                        <div className="col-12">
                            <div className="border rounded mt-4" style={{padding: 20}}>
                                <p style={{margin: "10px 0 0 0"}}>Código de usuario o nombre:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: Manuel o U12345"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Rol de usuario:</p>
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
                                
                                <button
                                    className="btn btn-blue"
                                    onClick={ () => this.onSearch() }
                                    style={{margin: "30px 0 0 0"}}
                                >
                                    BUSCAR
                                </button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-12">
                            <div className="border rounded mt-4" style={{padding: 20}}>
                                <h5><b>Registros encontrados:</b></h5>
                                <br />
                                <Table hover responsive>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Fecha de creación</th>
                                        <th>Rol</th>
                                        <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            items.map( ( item, index ) => (
                                                <tr keY={`item-${item.name}`}>
                                                    <th scope="row">{index}</th>
                                                    <td>{item.code}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.rol}</td>
                                                    <td>
                                                    <button
                                                        className="btn btn-blue"
                                                        style={{marginRight:10}}
                                                        onClick={ () => this.toggle() }
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-red"
                                                        onClick={ () => {}}
                                                    >
                                                        Eliminar
                                                    </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                                </div>
                            </div>
                        </div>
                </div>
                <Modal
                    isOpen={ this.state.isOpen }
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
                        }}
                    >
                        <p 
                        style={{
                            fontWeight: 500
                        }}>EDITAR USUARIO</p>
                        <p style={{margin: "10px 0 0 0"}}>Código de usuario o nombre:</p>
                        <input
                            className="input-component"
                            placeholder="Ejemplo: Manuel o U12345"
                            style={{margin: 0}}
                            value="Manuel"
                        />
                        <p style={{margin: "10px 0 0 0"}}>Rol:</p>
                        <select
                            className="input-component"
                            placeholder="Ejemplo: 123-000k32"
                            style={{margin: 0, height: 40}}
                        >
                            <option>Seleccione un rol</option>
                            <option>Administrador I</option>
                            <option selected>Administrador II</option>
                            <option>Administrador III</option>
                            <option>Usuario</option>
                        </select>
                        <p style={{margin: "10px 0 0 0"}}>Ruc:</p>
                        <input
                            className="input-component"
                            placeholder="Ejemplo: Manuel o U12345"
                            style={{margin: 0}}
                            value="123456789"
                        />
                        <p style={{margin: "10px 0 0 0"}}>Dirección:</p>
                        <input
                            className="input-component"
                            placeholder="Ejemplo: Manuel o U12345"
                            style={{margin: 0}}
                            value="Av. javier prado 123"
                        />
                        <div className="d-flex justify-content-center" style={{marginTop: 30}}>
                            <button
                                className="btn btn-secondary"
                                style={{marginRight:10}}
                                onClick={ () => this.toggle() }
                            >
                                Cancelar
                            </button>
                            <button
                                className="btn btn-blue"
                                onClick={ () => {}}
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                </Modal>
                <br /> <br /> <br /> <br /> <br />
            </Layout>
        )
    }
}
