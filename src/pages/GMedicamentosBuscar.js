import React, { Component } from 'react'

import Layout from '../components/Layout'
import "../styles/button.scss"
import "../styles/input.scss"
import { Table, Input } from 'reactstrap'


export default class GestionarMedicamentos extends Component {
    state={
        items:[
            {
                name: "Dukoral",
                code: "24NF34-000023G",
                date: "12/09/2019"
            },
            {
                name: "Panadol",
                code: "24NF34-000023G",
                date: "12/09/2019"
            },
            {
                name: "Paracetamol",
                code: "24NF34-000023G",
                date: "12/09/2019"
            },
            {
                name: "Panadol mas fuerte",
                code: "24NF34-000023G",
                date: "12/09/2019"
            },
        ]
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
    render() {
        const { items } = this.state
        return (
            <Layout { ...this.props }>
                <div>
                    <br />
                    <h5>Buscar medicamentos</h5>
                    <div className="row">
                        <div className="col-12">
                            <div className="border rounded mt-4" style={{padding: 20}}>
                                <p style={{margin: "10px 0 0 0"}}>Nombre:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: Dukoral"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Código:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: 123-000k32"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Lote:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: 120-0000012"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Fecha:</p>
                                <Input
                                    style={{
                                        backgroundColor: "#F8F8F8",
                                        border: "none"
                                    }}
                                    type="date"
                                    name="date"
                                    placeholder="fecha de vencimiento"
                                />
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
                                        <th>Nombre del medicamento</th>
                                        <th>Código</th>
                                        <th>Fecha de registro</th>
                                        <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            items.map( ( item, index ) => (
                                                <tr keY={`item-${item.name}`}>
                                                    <th scope="row">{index}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.code}</td>
                                                    <td>{item.date}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-blue"
                                                            style={{marginRight:10}}
                                                            onClick={ () => this.props.history.push("/detalle/dukoral") }
                                                        >
                                                            Ver detalles
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
            </Layout>
        )
    }
}
