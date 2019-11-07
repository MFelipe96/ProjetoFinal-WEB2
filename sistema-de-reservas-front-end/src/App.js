import React from 'react';
import Cabecalho from './pages/Cabecalho';
import Home from './pages/Home';
import Promocao from './pages/Promocao';
import Reserva from './pages/Reserva';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {


    return (
     <Router>
       <div>
         <Cabecalho />
         <div id="holder">
           <div id="body" className="container main-container">
              <Route exact path="/" component={Home} />
             <Route path="/promocao" component={Promocao} />
             <Route path="/reserva" component={Reserva} />
           </div>
         </div>
       </div>
     </Router>
   );
}

export default App;