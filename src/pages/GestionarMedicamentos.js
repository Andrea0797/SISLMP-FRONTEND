import React, { Component } from 'react'

import Layout from '../components/Layout'

export default class GestionarMedicamentos extends Component {
    render() {
        return (
            <Layout { ...this.props }>
                <div>
                    <br />
                    <h5>Gestionar medicamentos</h5>
                
                </div>
            </Layout>
        )
    }
}
