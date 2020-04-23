import React, { Component } from 'react'
import axios from 'axios';
import { createHashHistory } from 'history'

import Layout from '../components/Layout'

import "../styles/button.scss"
import "../styles/input.scss"

export const history = createHashHistory()
export default class Consulta extends Component {
    constructor(props,history){
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }
    onSearch(){
        //this.props.history.push("/detalle/dukoral")
        axios.get('https://sislmp-upc.herokuapp.com/Consultar/'+ this.state.codigo).then(
            response => {
                    this.props.history.push("/detalle/"+ this.state.codigo)
                  }).catch(function(error){
                    console.log(error);
                })
    }
    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    render() {
        return (
            <Layout { ...this.props }>
                <div>
                    <br />
                    <h5>Consulta de medicamentos</h5>
                    <p>Ingrese el código único:</p>
                    <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-6 col-xl-6">
                            <div className="d-flex align-items-center">
                                <input
                                    name="codigo"
                                    className="input-component"
                                    onChange={this.handleChange}
                                    placeholder="Ejemplo: 234NT-121300001"
                                    style={{margin: 0}}
                                    required
                                />
                                <button
                                    className="btn btn-blue"
                                    style={{marginLeft: 10}}
                                    onClick={ () => this.onSearch() }
                                >
                                    BUSCAR
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </Layout>
        )
    }
}
