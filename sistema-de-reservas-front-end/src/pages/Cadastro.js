import React from 'react';
import { Link } from 'react-router-dom';

const Cadastro = () => (
    <div className="row">
        <div className="col-lg-12 text-center">
            <h1>Cadastro</h1>
            <p>Tem muita gente procurando por quartos de hotel. 
                Não deixa essa oportunidade passar e cadastre o 
                seu site ou hotel agora mesmo!</p>
            <h3>O que você deseja cadastrar ?</h3>
            <p>
                <Link to='cadastroSiteForm' className="btn btn-success btn-space">Site</Link>
                <Link to='verPalpites' className="btn btn-success btn-space">Hotel</Link>
            </p>
        </div>
    </div>
)


export default Cadastro;
