import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => (
    <div className="row">
        <div className="col-lg-12 text-center">
            <h1>Site de Reservas</h1>
            <p>Anuncie agora mesmo o seu quarto. Tem muita
                gente procurando por promoções. Não deixa essa 
                oportunidade passar!</p>
            <h3>Selecione a opção abaixo</h3>
            <p>
                <Link to='palpiteForm' className="btn btn-success btn-space">Ver todas promoções</Link>
                <Link to='verPalpites' className="btn btn-success btn-space">Cadastrar site</Link>
            </p>
        </div>
    </div>
)


export default Home;