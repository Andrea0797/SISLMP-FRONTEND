import React, { Component } from 'react'

import Layout from '../components/Layout'

export default class Home extends Component {
    render() {
        return (
            <Layout { ...this.props }>
                <div>
                    <br />
                    <h5 style={{textAlign:"center"}}>BIENVENIDO AL SISTEMA DE CONSULTAS DE MEDICAMENTOS</h5>
                    
                                <div className="border rounded p-3 mt-4" style={{ height: 420}}>
                                <img
                                    src="http://www.digemid.minsa.gob.pe/UpLoad/UpLoaded/JPG/Noticias/NotaPrensa/Banner/2020/03/B07_2020_03-10.JPG"
                                    alt="img"
                                    style={{
                                        width: "100%", objectFit: "contain", height: "100%"
                                    }}
                                />
                            </div>
                </div>
            </Layout>
        )
    }
}
