import React from 'react';
import Cabecalho from './pages/Cabecalho';
import Home from './pages/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import CadastroSiteForm from './pages/CadastroSiteForm';
import CadastroHotelForm from './pages/CadastroHotelForm';
import  Login from './pages/Login';
import LoginForm from './pages/LoginForm';
import ListaPromocaoHotel from './pages/ListaPromocaoHotel';
import ListaPromocaoSite from './pages/ListaPromocaoSite';
import CadastroPromocaoForm from './pages/CadastroPromocaoForm';
function App() {
  
    return (
     <Router>
       <div>
         <Cabecalho />
         <div id="holder">
           <div id="body" className="container main-container">
              <Route exact path="/" component={Home} />
              <Route path="/loginForm" component={LoginForm}/>
              <Route path="/cadastroSiteForm" component={CadastroSiteForm}/>
              <Route path="/cadastroHotelForm" component={CadastroHotelForm}/>
              <Route path="/cadastro" component={Cadastro} />
              <Route path="/login" component={Login} />
              <Route path="/hotel" component={ListaPromocaoHotel}/>
              <Route path="/site" component={ListaPromocaoSite}/>
              <Route path="/cadastroPromocao" component={CadastroPromocaoForm}/>
           </div>
         </div>
       </div>
     </Router>
   );
}

export default App;