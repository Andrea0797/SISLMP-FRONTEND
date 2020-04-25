import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Consulta from './pages/Consulta';
import Validar from './pages/Validar';
import GestionarUsuarios from './pages/GestionarUsuarios';
import Detalle from './pages/Detalle';
import GUsuariosBuscar from './pages/GUsuariosBuscar';
import GUsuariosRegistrar from './pages/GUsuariosRegistrar';
import AgregarUsuario from './pages/AgregarUsuario';
import EditarUsuario from './pages/EditarUsuario';
import GestionarMedicamentos from './pages/GMedicamentosRegistrar';
import GestionarMedicamentosBuscar from './pages/GMedicamentosBuscar';
const App = () => {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login}  />
          <Route path="/inicio" component={Home} />
          <Route path="/consultar" component={Consulta} />
          <Route path="/transacciones" component={Validar} />
          <Route path="/usuarios" component={GestionarUsuarios} />
          <Route path="/detalle/:id" component={Detalle} />
          <Route path="/agregarusuario" component={AgregarUsuario} />
          <Route path="/editarUsuario/:id" component={EditarUsuario} />
          <Route path="/Gusuarios/buscar" component={GUsuariosBuscar} />
          <Route path="/Gusuarios/agregar" component={GUsuariosRegistrar} />
          <Route path="/medicamentos/buscar" component={GestionarMedicamentosBuscar} />
          <Route path="/medicamentos/registrar" component={GestionarMedicamentos} />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
