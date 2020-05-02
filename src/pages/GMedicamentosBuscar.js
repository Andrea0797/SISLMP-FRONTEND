import React, { Component } from 'react'

import Layout from '../components/Layout'
import "../styles/button.scss"
import "../styles/input.scss"
import moment from 'moment';
import { Table, Input } from 'reactstrap'
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';

export default class GestionarMedicamentos extends Component {
    constructor(props){
        super(props);
        this.state={ 
            medicamentos: []
        }
    this.delete = this.delete.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleChangeSelect2 = this.handleChangeSelect2.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }
    componentDidMount(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        this.getMedicamentos()
    }
    handleChangeSelect(e) {
        this.setState(
            {
                rol: e.label
            }
        )
    }
    VerDetalle(lote){
        //http://localhost:3006/
        //https://sislmp-upc.herokuapp.com
        axios.get('https://sislmp-upc.herokuapp.com/Consultar/'+ lote).then(
            response => {
                    if(response.data.count == 0){
                        notify.show("El código no tiene un medicamento asociado, busque otro código.",5000);
                        //(window.confirm("El código no tiene un medicamento asociado, busque otro código.");
                    }else{
                        this.props.history.push("/detalle/"+ lote)
                    }
                    
                  }).catch(function(error){
                    console.log(error);
                })
    }
    handleChangeSelect2(e) {
        window.confirm(e.label);
        this.setState(
            {
                rol: e.label
            }
        )
      }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    delete(id){
        if(window.confirm('Esta seguro de eliminar el registro ?')){
            axios.delete('https://sislmp-upc.herokuapp.com/getUsuarios/delete/'+id)
            .then(res => {
                this.getMedicamentos();
                console.log(res);
                notify.show(res.data.message,5000);
                });
            }
    
    }
    getMedicamentos(){
        axios.get('https://sislmp-upc.herokuapp.com/medicamentos').then(
            response => {
                    this.setState({
                        medicamentos: response.data.data,
                      isLoading: false
                    });
                    console.log(response.data.data);
                  }).catch(function(error){
                    console.log(error);
                })
    }
    search(){
        const filter = {
            nombre: this.state.nombre == undefined ? "undefined" :this.state.nombre,
            nro: this.state.nro== undefined ? "undefined" :this.state.nro,
            lote: this.state.lote== undefined ? "undefined" :this.state.lote,
            fecha: this.state.fecha== undefined ? "undefined" :this.state.fecha
          };
          console.log(Object.values(filter).join(","));
          var filtro = Object.values(filter).join(",");
          
        axios.get('https://sislmp-upc.herokuapp.com/medicamentos/filtrar/'+filtro)
        .then(res => {
            this.setState({
                medicamentos: res.data.data,
              isLoading: false
            });
            console.log(res.data.data)
            });
    }
    
    
    onSearch(){
        alert("Buscar")
    }
    render() {
        const {medicamentos } = this.state
        return (
            <Layout { ...this.props }>
                <Notifications />
                <div>
                    <br />
                    <h5>Buscar medicamentos</h5>
                    <div className="row">
                        <div className="col-12">
                            <div className="border rounded mt-4" style={{padding: 20}}>
                                <p style={{margin: "10px 0 0 0"}}>Nombre:</p>
                                <input
                                    name="nombre"
                                    className="input-component"
                                    placeholder="Ejemplo: Dukoral"
                                    onChange={this.handleChange}
                                    style={{margin: 0}}
                                />
                                {
                                    /**
                                     * <p style={{margin: "10px 0 0 0"}}>Nro de Registro:</p>
                                     + <input
                                     +     name="nro"
                                     +     className="input-component"
                                     +     onChange={this.handleChange}
                                     +     placeholder="Ejemplo: 123-000k32"
                                     +     style={{margin: 0}}
                                     + />
                                     * 
                                     */
                                }
                                
                                <p style={{margin: "10px 0 0 0"}}>Lote:</p>
                                <input
                                    name="lote"
                                    className="input-component"
                                    onChange={this.handleChange}
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
                                    name="fecha"
                                    onChange={(event) => this.setState({fecha: event.target.value})}
                                    placeholder="fecha de vencimiento"
                                />
                                <button
                                    className="btn btn-blue"
                                    onClick={ () => this.search() }
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
                                <Table responsive style={{color: '#293038'}}>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>Nombre del medicamento</th>
                                        <th>Nro de Registros</th>
                                        <th>Fecha de registro</th>
                                        <th>Cantidad x Lote</th>
                                        <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            medicamentos.map( ( item, index ) => (
                                                <tr key={`item-${index}${item.name}`}>
                                                    <th scope="row">{index}</th>
                                                    <td>{item.Nombre_Comercial}</td>
                                                    <td>{item.Nro_Registro}</td>
                                                    <td>{moment(item.FechaVencimiento).format("YYYY/MM/DD")}</td>
                                                    <td>{item.Cantidad || 0}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-blue"
                                                            style={{marginRight:10}}
                                                            onClick={ () => this.VerDetalle(item.Lote) }
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
