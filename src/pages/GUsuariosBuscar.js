import React, { Component } from 'react'

import Layout from '../components/Layout'
import "../styles/button.scss"
import "../styles/input.scss"
import Notifications, {notify} from 'react-notify-toast';
import moment from 'moment';
import Select from 'react-select';
import { Table, Modal } from 'reactstrap'
import axios from 'axios';

const options = [
    { label: "Administrador I", value: "Administrador I" },
  { label: "Administrador II", value: "Administrador II" },
  { label: "Usuario A", value: "Usuario A" },
  { label: "Usuario B", value: "Usuario B" },
  { label: "Usuario C", value: "Usuario C" }
  ];
export default class BuscarUsuarios extends Component {
    constructor(props){
        super(props);
        this.state={ 
            usuarios: [], 
            isLoading: true, 
            error:null,
            isOpen: false,
            user:{}
    }
        this.delete = this.delete.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleChangeSelect2 = this.handleChangeSelect2.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }
    handleChangeSelect(e) {
        this.setState(
            {
                rol: e.label
            }
        )
    }
    editar(id){
        console.log(this.props.match.params)
        const obj = {
          user: this.state.user,
        };
        obj.user.Rol = this.state.Erol;
        obj.user.Nombre = this.state.ENombre == undefined ? obj.user.Nombre : this.state.ENombre;
        obj.user.RUC = this.state.ERUC == undefined ? obj.user.RUC : this.state.ERUC;
        obj.user.Direccion = this.state.EDireccion == undefined ? obj.user.EDireccion : this.state.Direccion;
        console.log(obj);
        axios.put('https://sislmp-upc.herokuapp.com/getUsuarios/update/'+id, obj)
            .then(res =>{
                notify.show(res.data.message,5000);
                this.getUsuarios();
                const { isOpen } = this.state;
                this.setState({
                     isOpen: ! isOpen
                })
                console.log(res.data)
            } ).catch(function(error){
                console.log(error);
            });
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
   
    getUsuarios(){
        axios.get('https://sislmp-upc.herokuapp.com/getUsuarios').then(
            response => {
                    this.setState({
                        usuarios: response.data.data,
                      isLoading: false
                    });
                    console.log(response.data.data);
                  }).catch(function(error){
                    console.log(error);
                })
    }
    componentDidMount(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        this.getUsuarios()
    }
    search(){
        axios.get('https://sislmp-upc.herokuapp.com/getUsuarios/search/'+ this.state.codigo+'-'+this.state.rol)
        .then(res => {
            this.setState({
                usuarios: res.data.data,
              isLoading: false
            });
            console.log('Borrado')
            });
    }
    delete(id){
        if(window.confirm('Esta seguro de eliminar el registro ?')){
            axios.delete('https://sislmp-upc.herokuapp.com/getUsuarios/delete/'+id)
            .then(res => {
                this.getUsuarios();
                console.log(res);
                notify.show(res.data.message,5000);
                });
            }
    
    }
    refreshpage(){
        this.props.history.push('/usuarios');
    }
    
    toggle(id){
        this.getUser(id)
        const { isOpen } = this.state;
        this.setState({
             isOpen: ! isOpen
        })
    }
    getUser(id){
        console.log(this.props.match.params)
        axios.get('https://sislmp-upc.herokuapp.com/editarUsuario/'+id).then(
            response => {
                    this.setState({
                        user: response.data.data,
                        Erol: response.data.data.Rol,
                        ERUC: response.data.data.RUC,
                        ENombre: response.data.data.Nombre,
                        EDireccion: response.data.data.Direccion

                    });
                    console.log(response.data.data);
                  }).catch(function(error){
                    console.log(error);
                })
    }
    render() {
        const{user} = this.state;
        return (
            <Layout { ...this.props }>
                <div>
                    <br />
                    <Notifications />
                    <h5>Buscar usuarios</h5>
                    <div className="row">
                        <div className="col-12">
                            <div className="border rounded mt-4" style={{padding: 20}}>
                                <p style={{margin: "10px 0 0 0"}}>Código de usuario o nombre:</p>
                                <input
                                    name="codigo"
                                    className="input-component"
                                    onChange={this.handleChange}
                                    placeholder="Ejemplo: Manuel o U12345"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Rol de usuario:</p>
                            
                                <Select className="input-component" style={{margin: 0, height: 40}} name="rol" onChange={this.handleChangeSelect} styles={{width:'60px'}} options={options}/>
                                
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
                                <Table responsive style={{ marginTop: 30 , color: '#293038'}}>
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
                                            this.state.usuarios.map( ( item, index ) => (
                                                <tr keY={`item-${item.name}`}>
                                                    <th scope="row">{index}</th>
                                                    <td>{item.Codigo}</td>
                                                    <td>{item.Nombre}</td>
                                                    <td>{moment(item.Creacion).format("YYYY/MM/DD")}</td>
                                                    <td>{item.Rol}</td>
                                                    <td>
                                                    <button
                                                        className="btn btn-blue"
                                                        style={{marginRight:10}}
                                                        onClick={ () => this.toggle(item.id) }
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-red"
                                                        style={{backgroundColor : "#D33B26", borderRadius:"6px"}}
                                                        onClick={ () => {this.delete(item.id)}}
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
                            fontWeight: 500,
                            color: "#004355"
                        }}>EDITAR USUARIO</p>
                        <p style={{margin: "10px 0 0 0", color: "#717171"}}>Código de usuario o nombre:</p>
                        <input
                            name="ENombre"
                            className="input-component"
                            placeholder="Ejemplo: Manuel o U12345"
                            style={{margin: 0}}
                            value={this.state.ENombre}
                            onChange={e => this.setState({ENombre: e.target.value})}
                        />
                        <p style={{margin: "10px 0 0 0",color: "#717171"}}>Rol:</p>
                        <Select name="Erol" 
                                    value={options.filter(({value}) => value === this.state.Erol)}
                                    onChange={e => this.setState({Erol: e.label})}
                                    styles={{width:'60px'}} 
                                    options={options}/>
                        <p style={{margin: "10px 0 0 0", color: "#717171"}}>Ruc:</p>
                        <input
                            className="input-component"
                            style={{margin: 0}}
                            name="ERUC"
                            value = {this.state.ERUC}
                            onChange={e => this.setState({ERUC: e.target.value})}
                            required
                        />
                        <p style={{margin: "10px 0 0 0", color: "#717171"}}>Dirección:</p>
                        <input
                            name="EDireccion"
                            className="input-component"
                            placeholder="Ejemplo: Manuel o U12345"
                            style={{margin: 0}}
                            onChange={e => this.setState({EDireccion: e.target.value})}
                            value = {this.state.EDireccion}
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
                                onClick={ () => this.editar(user.id)}
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
