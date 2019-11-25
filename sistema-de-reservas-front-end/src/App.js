import React from 'react';
import Cabecalho from './pages/Cabecalho';
import Home from './pages/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import CadastroSiteForm from './pages/CadastroSiteForm';
import Login from './pages/Login';
import CadastroSite from './pages/CadastroSite';

function App() {


    return (
     <Router>
       <div>
         <Cabecalho />
         <div id="holder">
           <div id="body" className="container main-container">
              <Route exact path="/" component={Home} />
              <Route path="/cadastroSiteForm" component={CadastroSiteForm}/>
             <Route path="/cadastro" component={Cadastro} />
             <Route path="/login" component={Login} />
           </div>
         </div>
       </div>
     </Router>
   );
}

export default App;