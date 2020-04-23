import React, { Component } from 'react'

import Layout from '../components/Layout'

export default class Home extends Component {
    render() {
        return (
            <Layout { ...this.props }>
                <div>
                    <br />
                    <h5>BIENVENIDO AL SISTEMA DE CONSULTAS DE MEDICAMENTOS</h5>
                
                </div>
            </Layout>
        )
    }
}
