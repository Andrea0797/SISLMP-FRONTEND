import React, {Component} from 'react';
import 'react-dropdown/style.css';
import Notifications, {notify} from 'react-notify-toast';
import axios from 'axios';
import Select from 'react-select';
import { createHashHistory } from 'history'
import App from "../App"
import Layout from '../components/Layout'
const options = [
    { label: "Administrador I", value: 1 },
  { label: "Administrador II", value: 2 },
  { label: "Usuario A", value: 3 },
  { label: "Usuario B", value: 4 },
  { label: "Usuario C", value: 5 }
  ];
  export const history = createHashHistory()
export default class Create extends Component {
    constructor(props){
        super(props)
        this.state={
            Usuario: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
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
      prueba(){
        notify.show("this is sample text", "success ", 5000);
      }
      agregar() {
        
        const obj = {
            Codigo: this.state.codigo,
            Nombre: this.state.nombre,
            Username: this.state.username,
            Email: this.state.email,
            Rol: this.state.rol,
            RUC: this.state.ruc,
            Direccion: this.state.direccion
        };
       console.log(obj);
        axios.post('https://sislmp-upc.herokuapp.com/getUsuarios/save', obj)
            .then(
                res =>{
                    if(res.message == "Nuevo registro agregado."){
                        notify.show(res.message, "success ", 5000);
                        setTimeout(() => {
                            this.props.history.push('/usuarios');
                          }, 2000)
                    }else{
                        notify.show(res.message);
                        setTimeout(() => {
                            this.props.history.push('/usuarios');
                          }, 2000)
                    }
            })
  }
    render(){
        return(
            
            <Layout { ...this.props }>
            <React.Fragment>
            <Notifications />
                <div>
                    <br />
                    
                    <h5 >AGREGAR USUARIO</h5>
                    <div  className="border rounded mt-4">
                    <div className="row mt-4">
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-2">
                        <p style={{fontSize: 14}}>CÓDIGO</p>
                            <div className="d-flex align-items-center">
                            
                                <input
                                    name="codigo"
                                    style = {{width:'100px'}}
                                    className="input-component col-lg-12 "
                                    onChange={this.handleChange}
                                    placeholder="Ejemplo: RICARDO DIAZ"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-2">
                        <p style={{fontSize: 14}}>Nombre</p>
                            <div className="d-flex align-items-center">
                            
                                <input
                                    name="nombre"
                                    style = {{width:'100px'}}
                                    className="input-component col-lg-12 "
                                    onChange={this.handleChange}
                                    placeholder="Ejemplo: RICARDO DIAZ"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-2">
                        <p style={{fontSize: 14}}>Nombre de Usuario</p>
                            <div className="d-flex align-items-center">
                            
                                <input
                                    name="username"
                                    style = {{width:'100px'}}
                                    className="input-component col-lg-12 "
                                    onChange={this.handleChange}
                                    placeholder="Ejemplo: ricardodiaz"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-2">
                        <p style={{fontSize: 14}}>Email</p>
                            <div className="d-flex align-items-center">
                            
                                <input
                                    name="email"
                                    style = {{width:'100px'}}
                                    className="input-component col-lg-12 "
                                    onChange={this.handleChange}
                                    placeholder="Ejemplo: ricardo@gmail.com"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-2">
                        <p style={{fontSize: 14}}>Rol</p>
                            <div className="align-items-center mb-3">
                            <Select name="rol" onChange={this.handleChangeSelect} styles={{width:'60px'}} options={options}/>
                            
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-2">
                        <p style={{fontSize: 14}}>RUC</p>
                            <div className="d-flex align-items-center">
                            
                                <input
                                    name="ruc"
                                    style = {{width:'100px'}}
                                    className="input-component col-lg-12 "
                                    onChange={this.handleChange}
                                    placeholder="Ejemplo: 102030405"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-2">
                        <p style={{fontSize: 14}}>Dirección</p>
                            <div className="d-flex align-items-center">
                            
                                <input
                                    name="direccion"
                                    style = {{width:'100px'}}
                                    className="input-component col-lg-12 "
                                    onChange={this.handleChange}
                                    placeholder="Calle los tusilagos, Urb. Las Flores, SMP"
                                    required
                                />
                            </div>
                        </div>
                        
                    </div>
                    <button
                         className="btn btn-blue ml-2 mb-5"
                         style={{width: "20%"}}
                         onClick={ () => this.agregar() }
                     >
                         AGREGAR
                     </button>
                    </div>
                    </div>
            </React.Fragment>
            </Layout>
        )
    }
}