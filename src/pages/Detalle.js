import React, { Component } from 'react'
import axios from 'axios';
import Layout from '../components/Layout'
import BagIcon from "../assets/Bag.svg";
import FabricanteIcon from "../assets/Fabricante.svg";
import LoteIcon from "../assets/Lote.svg";
import ShipmentIcon from "../assets/Shipment.svg";

const IMG_DETALLE = "https://i.ytimg.com/vi/2vcFLUnhG3w/maxresdefault.jpg"

export default class Detalle extends Component {
    constructor(){
        super();
        this.state = {
            logistica : [],
            detalles : [],
            objMedicamento : {},    
            nombreComercial : ""
        };
    }
    componentWillMount(){
      }
    componentDidMount(){
         this.getMedicamento();
     }

    getMedicamento(){
        axios.get('https://sislmp-upc.herokuapp.com/Consultar/'+this.props.match.params.id).then(
            response => {
                    console.log(response.data.data);
                    
                    this.setState({
                        logistica:[
                            {
                                tipo: "Farmacia:",
                                nombre: "INCAFARMA S.A.C",
                                icon: BagIcon
                            },
                            {
                                tipo: "Distribuidor:",
                                nombre: "P&G Distribuidores",
                                icon: ShipmentIcon
                            },
                            {
                                tipo: "Fabricante:",
                                nombre: "Laboratorios GENFAR",
                                icon: FabricanteIcon
                            },
                            {
                                tipo: "Lote:",
                                nombre: response.data.data.lote,
                                icon: LoteIcon
                            },
                        ],
                        detalles:[
                            {
                                title: "Formas farmacéuticas",
                                description: response.data.data.formaFarmaceutica
                            },
                            {
                                title: "Principios activos",
                                description: response.data.data.PrincipiosActivos
                            },
                            {
                                title: "Vías de administración",
                                description: response.data.data.ViasAdministracion
                            },
                            {
                                title: "Características",
                                description: response.data.data.Caracteristicas
                            },
                        ],
                        objMedicamento : response.data.data
                    });
                  }).catch(function(error){
                    console.log(error);
                })
    }

    
    renderDetalle( item ){
        const{ title, description } = item;
        return(
            <React.Fragment>
                <dt style={{fontSize: 14}}>{title}</dt>
                <dd style={{fontSize: 12, color: "#717171"}}>{description}</dd>
            </React.Fragment>
        )
    }
    renderItem( item, index ) {
        const { logistica } = this.state;
        const{ tipo, nombre, icon } = item;
        return( 
            <div>
                <p style={{fontSize: 14}}>
                    <img className="mr5" src={icon} alt="icon"/> <b>{ tipo }</b> { nombre }
                </p>
                {
                     logistica.length - 1 > index ? 
                    <div style={{backgroundColor: "#262F56", width: 2, height: 20,margin: "0 0 10px 12px"}}/> : null
                }
            </div>
        )
    }
    render() {
        const { logistica, detalles,objMedicamento } = this.state;
        return (
            <Layout { ...this.props }>
                <div>
                    <br />
                    <h5>DETALLE DEL MEDICAMENTO</h5>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="border rounded p-3 mt-4" style={{ height: 180}}>
                                <img
                                    src={ objMedicamento.Ruta_IMG }
                                    alt="img"
                                    style={{
                                        width: "100%", objectFit: "contain", height: "100%"
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="border rounded pb-0 mt-4" style={{padding: 20, height: 180}}>
                                <h5><b>{objMedicamento.nombreComercial}</b></h5>
                                <p><b>Nº de registro: </b>{objMedicamento.Nro_Registro}</p>
                                <p className="text-success">Autorizado (12/09/2019)</p>
                                <p><b>Estado: </b>{objMedicamento.Estado}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="border rounded mt-4" style={{padding: 20}}>
                                <h5><b>Detalle del medicamento</b></h5>
                                <br />
                                <dl>
                                    {
                                        detalles.map( item => this.renderDetalle( item ))
                                    }
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="border rounded pb-0 mt-4" style={{padding: 20}}>
                                <h5><b>Detalle logístico</b></h5>
                                <br />
                                {
                                     logistica.map( ( item, i ) => this.renderItem( item, i ) )
                                }
                            </div>
                        </div>
                    </div>
                    <br /><br /><br /><br />
                </div>
            </Layout>
        )
    }
}
