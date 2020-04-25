import React, {Component} from 'react';
import axios from 'axios';
import App from "../App"
import Layout from '../components/Layout'
import Select from 'react-select';
import Notifications, {notify} from 'react-notify-toast';
const options = [
    { label: "Administrador I", value: "Administrador I" },
  { label: "Administrador II", value: "Administrador II" },
  { label: "Usuario A", value: "Usuario A" },
  { label: "Usuario B", value: "Usuario B" },
  { label: "Usuario C", value: "Usuario C" }
  ];
export default class Edit extends Component {
    constructor(){
        super();
        this.state = {
            user:{},
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    handleChangeSelect(e) {
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
    componentDidMount(){
        this.getUser()
     }
    
    getUser(){
        console.log(this.props.match.params)
        axios.get('https://sislmp-upc.herokuapp.com/editarUsuario/'+this.props.match.params.id).then(
            response => {
                    this.setState({
                        user: response.data.data,
                        rol: response.data.data.Rol
                    });
                    console.log(response.data.data);
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
    editar(){
        console.log(this.props.match.params)
        const obj = {
          user: this.state.user,
        };
        obj.user.Rol = this.state.rol;
        obj.user.Nombre = this.state.Nombre == undefined ? obj.user.Nombre : this.state.Nombre;
        obj.user.RUC = this.state.RUC == undefined ? obj.user.RUC : this.state.RUC;
        obj.user.Direccion = this.state.Direccion == undefined ? obj.user.Direccion : this.state.Direccion;
        axios.put('https://sislmp-upc.herokuapp.com/getUsuarios/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
    }
    onSubmit(e, id) {
        e.preventDefault();
        console.log(this.props.match.params)
        const obj = {
          user: this.state.user,
        };
        axios.put('https://sislmp-upc.herokuapp.com/getUsuarios/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        }
     
    render(){
        const{user} = this.state;
        return(
            <Layout { ...this.props }>
                <React.Fragment>
            <Notifications />
                <div>
                    <br />
                    
                    <h5 >EDITAR USUARIO</h5>
                    <div  className="border rounded mt-4">
                    <div className="row mt-4">
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-2">
                        <p style={{fontSize: 14}}>Nombre</p>
                            <div className="d-flex align-items-center">
                            
                                <input
                                    name="Nombre"
                                    style = {{width:'100px'}}
                                    value = {user.Nombre}
                                    className="input-component col-lg-12 "
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-2">
                        <p style={{fontSize: 14}}>Rol</p>
                            <div className="align-items-center mb-3">
                            <Select name="Rol" 
                                    value={options.filter(({value}) => value === this.state.rol)}
                                    onChange={this.handleChangeSelect} 
                                    styles={{width:'60px'}} 
                                    options={options}/>
                            
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-2">
                        <p style={{fontSize: 14}}>RUC</p>
                            <div className="d-flex align-items-center">
                            
                                <input
                                    name="RUC"
                                    style = {{width:'100px'}}
                                    value = {user.RUC}
                                    className="input-component col-lg-12 "
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-2">
                        <p style={{fontSize: 14}}>Dirección</p>
                            <div className="d-flex align-items-center">
                            
                                <input
                                    name="Direccion"
                                    style = {{width:'100px'}}
                                    value = {user.Direccion}
                                    className="input-component col-lg-12 "
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </div>
                        
                    </div>
                    </div>
                    <button
                         className="btn btn-blue ml-2 mb-5"
                         style={{width: "20%"}}
                         onClick={ () => this.editar() }
                     >
                         EDITAR
                     </button>
                    </div>
            </React.Fragment>
        </Layout>
        )
    }
}