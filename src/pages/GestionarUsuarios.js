import React, { Component } from 'react'
import Select from 'react-select';
import axios from 'axios';
import { Link } from "react-router-dom";
import App from '../App';
import Layout from '../components/Layout'
import moment from 'moment';
const options = [
    { label: "Administrador I", value: 1 },
  { label: "Administrador II", value: 2 },
  { label: "Usuario A", value: 3 },
  { label: "Usuario B", value: 4 },
  { label: "Usuario C", value: 5 }
  ];
  const defaultOption = options[0]; 
  
export default class GestionarUsuarios extends Component {

    constructor(props){
        super(props);
        this.state={ 
            usuarios: [], 
            isLoading: true, 
            error:null
    }
        this.delete = this.delete.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChangeSelect(e) {
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
            console.log('Borrado')
            });
        }

    }
    refreshpage(){
        this.props.history.push('/usuarios');
    }
    render() {
        return (
            <Layout { ...this.props }>
                <React.Fragment>
                <div>
                    <br />
                    <h5 >BUSCAR USUARIOS</h5>
                    <div  className="border rounded mt-4">
                    <div className="row mt-4">
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-2">
                        <p style={{fontSize: 14}}>Código de usuario o nombre</p>
                            <div className="d-flex align-items-center">
                            
                                <input
                                    name="codigo"
                                    style = {{width:'100px'}}
                                    className="input-component col-lg-12 "
                                    onChange={this.handleChange}
                                    placeholder="Ejemplo: COD0005"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-2">
                        <p style={{fontSize: 14}}>Rol de Usuario</p>
                            <div className=" align-items-center">
                            <Select name="rol" onChange={this.handleChangeSelect} styles={{width:'60px'}} options={options}/>
                            </div>
                        </div>
                        
                    </div>
                    <button
                         className="btn btn-blue ml-2 mt-2 mb-2"
                         style={{width: "20%"}}
                         onClick={ () => this.search() }
                     >
                         BUSCAR
                     </button>
                     <button
                         className="btn btn-blue ml-3 mt-2 mb-2"
                         style={{width: "20%"}}
                         onClick={ () => window.location.reload() }
                     >
                         LIMPIAR
                     </button>
                    </div>
                    
                    
                </div>
                    <div className="container mt-4 ">
                    <h6 >Listado de Usuarios</h6>
                    <Link  to={'/agregarusuario'} className="btn btn-primary">Agregar Registro</Link>
                    <table className="table table-striped" style={{ marginTop: 30 , color: '#293038'}}>
                    <thead>
                    <tr>
                                <th scope="col">CÓDIGO</th>
                                <th scope="col">NOMBRE</th>
                                <th scope="col">CREACIÓN</th>
                                <th scope="col">ROL</th>
                                <th colSpan="2">OPCIONES</th>
                    </tr>
                    </thead>
                    <tbody>
                                {this.state.usuarios.map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{data.Codigo}</td>
                                        <td>{data.Nombre}</td>
                                        <td>{moment(data.Creacion).format("YYYY/MM/DD")}</td>
                                        <td>{data.Rol}</td>
                                        <td>
                                        <Link to={"/editarUsuario/"+data.id} className="btn btn-primary">Editar</Link>
                                        </td>
                                        <td>
                                            <button  onClick={ () => this.delete(data.id) } className="btn btn-danger ">Borrar</button>
                                        </td>
                                    </tr>
                                )
                                    })}
                            </tbody>
                    </table>
                    </div>
                </React.Fragment>
                    
            </Layout>
        )
    }
}
