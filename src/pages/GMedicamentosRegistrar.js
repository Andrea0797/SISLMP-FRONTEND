import React, { Component } from 'react'

import Layout from '../components/Layout'
import "../styles/button.scss"
import "../styles/input.scss"
import { Input, Modal } from 'reactstrap'
import Notifications, {notify} from 'react-notify-toast';
import CheckICON from "../assets/check.svg"
import axios from 'axios';
import Select from 'react-select';

const options = [ ];
export default class GestionarMedicamentos extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
    }
    handleChangeSelect(e) {
        this.setState(
            {
                Nombre_Comercial: e.label,
                Id_Medicamento: e.value
            }
        )
        var medicinas = this.state.medicamentos;
        console.log(medicinas);
        for(var i in medicinas) {    
            var item = medicinas[i];   
            console.log(item);
            if(item.Nombre_Comercial == e.label){
                this.setState({
                    Nombre_Generico: item.Nombre_Generico,
                    Forma_Farmaceutica: item.Forma_Farmaceutica,
                    Rubro: item.Rubro
                });
            }
        }
      }

      agregar() {
        
        const obj = {
            id_digemid: this.state.Id_Medicamento,
            Lote: this.state.Lote,
            FechaVencimiento: this.state.startDate,
            //IMG_URL: "https://cdn77.pressenza.com/wp-content/uploads/2020/03/Heberon-Alfa-R-720x405.jpg"
            IMG_URL: this.state.file
        };
       console.log(obj);
        axios.post('https://sislmp-upc.herokuapp.com/medicamentos/save', obj)
            .then(
                res =>{
                    console.log(res);
                    if(res.data.message == "Nuevo registro agregado."){
                        this.toggle();
                        setTimeout(() => {
                            this.props.history.push('/medicamentos/buscar/');
                          }, 2000)
                    }else{
                        notify.show(res.data.message.message,5000);
                        // setTimeout(() => {
                        //     this.props.history.push('/Gusuarios/buscar');
                        //   }, 2000)
                    }
            })
  }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
        
      }

    state={
         isOpen: false
    }
    onRegister(){
        alert("Registrar")
    }
    getUsuarios(){
        axios.get('https://sislmp-upc.herokuapp.com/digemid').then(
            response => {
                    this.setState({
                        medicamentos: response.data.data,
                      isLoading: false
                    });
                    var someData = response.data.data
                    for(var i in someData) {    

                        var item = someData[i];   
                    
                        options.push({ 
                            "label" : item.Nombre_Comercial,
                            "value"  : item.id
                        });
                    }
                  }).catch(function(error){
                    console.log(error);
                })
    }
    toggle(){
        const { isOpen } = this.state;
        this.setState({
             isOpen: ! isOpen
        })
    }
    componentDidMount(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        this.getUsuarios();
    }

    render() {
        const { isOpen } = this.state;
        return (
            <Layout { ...this.props }>
            <Notifications />
                <div>
                    <br />
                    <h5>Registrar medicamentos</h5>
                    <div className="row">
                        <div className="col-12">
                            <div className="border rounded mt-4" style={{padding: 20}}>
                                {/* <p style={{margin: "10px 0 0 0"}}>Nombre comercial:</p>
                                <input
                                    className="input-component"
                                    placeholder="Ejemplo: Dukoral"
                                    style={{margin: 0}}
                                /> */}
                                <p style={{margin: "10px 0 0 0"}}>Nombre comercial:</p>
                                <Select name="Nombre_Comercial" 
                                        onChange={this.handleChangeSelect} 
                                        style={{margin: 0, height: 40}} 
                                        options={options}/>

                                <p style={{margin: "10px 0 0 0"}}>Nombre genérico:</p>
                                <input
                                    name="Nombre_Generico"
                                    className="input-component"
                                    value={this.state.Nombre_Generico}
                                    placeholder="Ejemplo: Dukoral premium"
                                    style={{margin: 0}}
                                />
                                
                                <p style={{margin: "10px 0 0 0"}}>Lote:</p>
                                <input
                                    name="Lote"
                                    onChange={this.handleChange}
                                    className="input-component"
                                    placeholder="Ejemplo: 120-0000012"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Forma farmacéutica:</p>
                                <input
                                    className="input-component"
                                    value={this.state.Forma_Farmaceutica}
                                    placeholder="Ejemplo: pastillas"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Rubro:</p>
                                <input
                                    className="input-component"
                                    onChange={this.handleChange}
                                    value={this.state.Rubro}
                                    placeholder="Ejemplo: cardiovascular"
                                    style={{margin: 0}}
                                />
                                <p style={{margin: "10px 0 0 0"}}>Fecha de vencimiento:</p>
                                
                                <Input
                                    style={{
                                        backgroundColor: "#F8F8F8",
                                        border: "none"
                                    }}
                                    type="date"
                                    name="Fecha_Vencimiento"
                                    onChange={(event) => this.setState({startDate: event.target.value})}
                                    placeholder="fecha de vencimiento"
                                    />
                                <p style={{margin: "10px 0 0 0"}}>Archivos:</p>
                                <input
                                name="url"
                                onChange={(event) => this.setState({
                                    file: URL.createObjectURL(event.target.files[0])
                                  })}
                                className="input-component" 
                                style={{margin: 0}}
                                    type="file"
                                />
                                {/* <input
                                    className="input-component"
                                    style={{margin: 0}}
                                    type="file"
                                />
                                <input
                                    className="input-component"
                                    style={{margin: 0}}
                                    type="file"
                                /> */}
                                <button
                                    className="btn btn-blue"
                                    onClick={ () => this.agregar() }
                                    style={{margin: "30px 0 0 0"}}
                                >
                                    REGISTRAR
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <Modal
                    isOpen={ isOpen }
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
                            alignItems: "center"
                        }}
                    >
                        <p 
                        style={{
                            fontWeight: 500
                        }}>SE REGISTRÓ DE MANERA SATISFACTORIA</p>
                        <img
                            src={
                                CheckICON
                            }
                            alt="checkicon"
                            style={{
                                width: 100,
                                marginTop: 30
                            }}
                        />
                    </div>
                </Modal>
            </Layout>
        )
    }
}
