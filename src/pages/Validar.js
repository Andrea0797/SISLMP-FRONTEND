import React, { Component } from 'react'

import Layout from '../components/Layout'
import { Table } from 'reactstrap'
import "../styles/button.scss"
import Notifications, {notify} from 'react-notify-toast';

export default class Validar extends Component {
    state={
        items:[
            {
                name: "Dukoral",
                lote: "24NF34-000023G",
                count: 102,
                ruc: "201034548"
            },
            {
                name: "Panadol",
                lote: "24NF34-000023G",
                count: 99,
                ruc: "201034548"
            },
            {
                name: "Paracetamol",
                lote: "24NF34-000023G",
                count: 10,
                ruc: "201034548"
            },
            {
                name: "Panadol mas fuerte",
                lote: "24NF34-000023G",
                count: 120,
                ruc: "201034548"
            },
        ]
    }
    componentDidMount(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    onAccept(){
        if ( window.confirm("¿Está seguro de aceptar el medicamento?") ) {
            notify.show("Se aceptó el medicamento",5000);
        }
    }
    onDecline(){
        if ( window.confirm("¿Está seguro de rechazar el medicamento?") ) {
            notify.show("Se rechazó el medicamento",5000);
        }
    }
    
    render() {
        const { items } = this.state;
        return (
            <Layout { ...this.props }>
            <Notifications />
                <div className="container">
                    <br />
                    <h5>Validar transacciones</h5>
                    <div className="row">
                        <div className="col-12">
                            <div className="border rounded mt-4" style={{padding: 20}}>
                                <p style={{margin: "10px 0 0 0"}}>Nombre:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: Dukoral"
                                    disabled
                                    style={{
                                        margin: 0,
                                        cursor: "not-allowed"
                                    }}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Lote:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: 120202FG-0000T7"
                                    style={{margin: 0}}
                                    type="email"
                                />
                                <p style={{margin: "10px 0 0 0"}}>Cantidad:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: 12"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Ruc de procedencia:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: 2010987654"
                                    style={{margin: 0}}
                                    type="email"
                                />
                                <button
                                    className="btn btn-blue"
                                    onClick={ () => {} }
                                    style={{margin: "30px 0 0 0"}}
                                >
                                    VALIDAR
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="border rounded mt-4" style={{padding: 20}}>
                                <Table responsive style={{color: '#293038'}}>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>Nombre del medicamento</th>
                                        <th>Lote</th>
                                        <th>Cantidad</th>
                                        <th>Ruc</th>
                                        <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            items.map( ( item, index ) => (
                                                <tr keY={`item-${item.name}`}>
                                                    <th scope="row">{index}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.lote}</td>
                                                    <td>{item.count}</td>
                                                    <td>{item.ruc}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-blue"
                                                            style={{marginRight:10}}
                                                            onClick={ () => this.onAccept() }
                                                        >
                                                            Aceptar
                                                        </button>
                                                        <button
                                                            className="btn btn-red"
                                                            style={{backgroundColor : "#D33B26", borderRadius:"6px"}}
                                                            onClick={ () => this.onDecline() }
                                                        >
                                                            Rechazar
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
