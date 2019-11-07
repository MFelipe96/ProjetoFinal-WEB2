import React from 'react';
import logo from './logo.jpg';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-left">
                        <img className="logo" alt="Logotipo" src={logo} width="50" height="50" />
                    </a>
                    <a className="navbar-brand">
                        Sistema de reservas
                    </a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            
                            <NavLink exact activeStyle={{ fontWeight: 'bold', color: 'yellowgreen' }} to='/'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink exact activeStyle={{ fontWeight: 'bold', color: 'yellowgreen' }} to='/reserva'>Reservas</NavLink>
                        </li>
                        <li>
                            <NavLink exact activeStyle={{ fontWeight: 'bold', color: 'yellowgreen' }} to='/promocao'>Promoções</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
)

export default Header;