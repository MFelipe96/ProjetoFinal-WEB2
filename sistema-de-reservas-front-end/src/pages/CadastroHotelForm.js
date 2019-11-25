import React from 'react';
import CadastroHotel from './CadastroHotel';
import {Link} from 'react-router-dom';
import Cadastro from './Cadastro';

class CadastroHotelForm extends React.Component {
    constructor() {
        super();
        this.state = {
            cnpj: '',
            senha: '',
            nome: '',
            cidade: '',
            estado: CadastroHotel.inicio(),
            mensagem: 'Digite sua cnpj para dar início',
            mensagemClassName: 'alert alert-info',
            hotelEncontrado: null,
            mostrarAjaxLoader: false,
            mensagensValidacao: {
                cnpj: '',
                senha: '',
                nome: '',
                cidade: '',
                confirmarSenha: '',
            },
        };
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h4>Cadastrar Hotel</h4>
                    <form className="form-horizontal" name="formCadastro">
                        <div className={this.state.mensagemClassName}>
                            {this.state.mensagem}
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-6">
                                    <label className="col-sm-2 control-label" htmlFor="cnpj">CNPJ</label>
                                    <div className="col-sm-10">
                                        <input type="text"
                                            max="14"
                                            className="form-control"
                                            name="cnpj"
                                            label="CNPJ"
                                            value={this.state.cnpj}
                                            onChange={(event) => this.handleUserInput(event)}
                                            onBlur={() => this.handleEmailChanged()}>
                                        </input>
                                        <span className="text text-danger">{this.state.mensagensValidacao['cnpj']}</span>
                                    </div>
                                </div>
                                <div className="col-xs-6">
                                    <label className="col-sm-2 control-label" htmlFor="senha">Senha</label>
                                    <div className="col-sm-10">
                                        <input type="password"
                                            className="form-control"
                                            name="senha"
                                            label="Senha"
                                            disabled={this.state.estado.campoSenhaDesabilitado}
                                            value={this.state.senha}
                                            onChange={(event) => this.handleUserInput(event)}
                                            onBlur={() => this.handleSenhaChanged()}>
                                        </input>
                                        <span className="text text-danger">{this.state.mensagensValidacao['senha']}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-6">
                                    <label className="col-sm-3 control-label" htmlFor="nome">Nome do hotel</label>
                                    <div className="col-sm-9">
                                        <input type="text"
                                            className="form-control"
                                            name="nome"
                                            label="Nome"
                                            disabled={this.state.estado.camposDadosPessoaisDesabilitados}
                                            value={this.state.nome}
                                            onChange={(event) => this.handleUserInput(event)}>
                                        </input>
                                        <span className="text text-danger">{this.state.mensagensValidacao['nome']}</span>
                                    </div>
                                </div>
                                <div className="col-xs-6">
                                    <label className="col-sm-2 control-label" htmlFor="cidade">Cidade</label>
                                    <div className="col-sm-10">
                                        <input type="text"
                                            className="form-control"
                                            name="cidade"
                                            label="Cidade"
                                            disabled={this.state.estado.camposDadosPessoaisDesabilitados}
                                            value={this.state.cidade}
                                            onChange={(event) => this.handleUserInput(event)}>
                                        </input>
                                        <span className="text text-danger">{this.state.mensagensValidacao['cidade']}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={this.state.estado.camposDadosCadastroDestaque ? 'form-group has-success' : 'form-group'}>
                            {this.state.estado.campoConfirmacaoSenhaVisivel && (
                                <label className="col-sm-2 control-label" htmlFor="confirmarSenha">Confirme a senha</label>
                            )}
                            <div className="col-sm-4">
                                {this.state.estado.campoConfirmacaoSenhaVisivel && (
                                    <input type="password"
                                        className="form-control"
                                        name="confirmarSenha"
                                        label="Confirmação de senha"
                                        value={this.state.confirmarSenha}
                                        onChange={(event) => this.handleUserInput(event)}>
                                    </input>
                                )}
                                <span className="text text-danger">{this.state.mensagensValidacao['confirmarSenha']}</span>
                            </div>
                        </div>
                        <div className={this.state.estado.camposDadosCadastroDestaque ? 'form-group has-success' : 'form-group'}>
                            <div className="col-sm-6">
                                {this.state.estado.botaoConfirmarCadastroVisivel && (
                                    <a type="submit"
                                        className="btn btn-success"
                                        name="confirmar"
                                        value={this.state.confirmarSenha}
                                        onClick={() => this.handleConfirmarCadastroClicked()}>
                                        Confirmar meu cadastro
                                        </a>
                                )}
                                <span className="text text-danger">{this.state.mensagensValidacao['confirmar']}</span>
                            </div>
                        </div>


                        <div className="form-group">
                            <div className="col-sm-12">
                                <a className="btn btn-default"
                                    name="enviar"
                                    disabled={this.state.estado.botaoEnvioDesabilitado}
                                    onClick={() => this.handleEnviarCadastroClicked()}>
                                    <span className="text text-danger">{this.state.mensagensValidacao['enviar']}</span>
                                    Finalizar meu cadastro
                                    </a>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-12">
                                        <Link to='cadastro' className="btn btn-success btn-space" >Voltar</Link>
                            </div>
                        </div>
                    </form>
                </div>
                {this.state.mostrarAjaxLoader && (<div className='ajaxLoaderClass' />)}
            </div>

        );
    }

    handleUserInput(e) {
        const nome = e.target.name;
        const valor = e.target.value;
        const mensagensValidacao = Object.assign({}, this.state.mensagensValidacao);
        mensagensValidacao[nome] = this.validarCampo({ nome, valor });
        this.setState({
            [nome]: valor,
            mensagensValidacao,
        });
    }

    mostrarAviso(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-warning', }); }
    mostrarInfo(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-info', }); }
    mostrarSucesso(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-success', }); }
    mostrarErro(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-danger', }); }
    mostrarAjaxLoader() { this.setState({ mostrarAjaxLoader: true }); }
    ocultarAjaxLoader() { this.setState({ mostrarAjaxLoader: false }); }

    
    async handleEmailChanged() {
        if (this.validarCampo({ nome: 'cnpj' }) !== '') return;
        this.mostrarAjaxLoader();
        try {
            const response = await fetch('http://localhost:8080/hotel?cnpj=' + this.state.cnpj);
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const hotelJson = await response.json();
                this.setState({
                    estado: CadastroHotel.hotelExistente(),
                    hotelEncontrado: hotelJson
                });
                this.mostrarAviso('CNPJ já cadastrado! Informe sua senha para cadastrar o seu hotel ');
            } else {
                this.setState({ estado: CadastroHotel.hotelInexistente() });
                this.mostrarInfo('CNPJ ainda não cadastrado! Informe uma nova senha e demais dados para cadastro');
            }
        } catch (e) {
            this.mostrarErro('Ocorreu um problema!');
            console.log(e);
        }
        this.ocultarAjaxLoader();
    }

    handleSenhaChanged() {
        if (!this.state.estado.eventoSenhaDesabilitado) {
            if (this.state.senha === this.state.hotelEncontrado.senha) {
                this.setState({
                    nome: this.state.hotelEncontrado.nome,
                    cidade: this.state.hotelEncontrado.cidade,
                });
                this.setState({ estado: CadastroHotel.hotelExistenteSenhaCorreta() });
                this.mostrarSucesso('Senha correta!');


            } else {
                this.setState({ estado: CadastroHotel.hotelExistenteSenhaIncorreta() });
                this.mostrarErro('Senha incorreta! Informe novamente!');
            }
        }
    }

    handleEnviarCadastroClicked() {
        if (!this.validarFormulario()) {
            this.mostrarErro('Atenção! Alguns campos não foram corretamente preenchidos!');
            return;
        }
        if (this.state.hotelEncontrado === null) {
            this.setState({ estado: CadastroHotel.confirmarCadastroHotelInexistente() });
            this.mostrarInfo('Verifique os dados e repita sua nova senha.');
        } else {
            this.setState({ estado: CadastroHotel.confirmarCadastroHotelExistente() });
            this.mostrarInfo('Verifique os seus dados');
        }
    }

    async handleConfirmarCadastroClicked() {
        if (!this.validarFormulario()) {
            this.mostrarErro('Atenção! Alguns campos não foram corretamente preenchidos!');
            return;
        }
        this.mostrarAjaxLoader();
        try {
            const novoCadastro = {
                nome: this.state.nome,
                cidade: this.state.cidade,
                cadastrante: {
                    id: null,
                }
            };
            if (this.state.hotelEncontrado === null) {
                const novoHotel = {
                    nome: this.state.nome,
                    senha: this.state.senha,
                    cnpj: this.state.cnpj,
                    cidade: this.state.cidade,
                };
                const response = await fetch('http://localhost:8080/hotel', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(novoHotel),
                })
                const hotelGravado = await response.json();
                novoCadastro.cadastrante.id = hotelGravado.id;
            } else {
                novoCadastro.cadastrante.id = this.state.hotelEncontrado.id;
            }
            await fetch('http://localhost:8080/cadastro', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(novoCadastro),
            });


            this.mostrarSucesso(`Obrigado pela preferência, ${this.state.nome}!`);
            this.setState({
                cnpj: '',
                senha: '',
                nome: '',
                cidade: '',
                confirmarSenha: '',
                hotelEncontrado: null,
            });
            this.setState({ estado: CadastroHotel.inicio() });
        } catch (e) {
            this.mostrarErro('Ocorreu um problema!');
            console.log(e);
        }
        this.ocultarAjaxLoader();
    }

    //campos de validação 
    validarCampo({ nome, valor = null }) {
        if (valor === null) {
            valor = this.state[nome];
        }


        if (nome === 'cnpj') {
            //fazer uma verificação valida para cnpj
            if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(valor)) {
                return 'CNPJ está em formato incorreto';
            }
        } else if (nome === 'senha') {
            if (valor.length === 0) {
                return 'Senha não pode ser vazia';
            } else if (this.state.hotelEncontrado === null) {
                if (valor.length < 6) {
                    return 'Senha muito curta';
                }
            }
        } else if (nome === 'nome' || nome === 'cidade') {
            if (valor === '') {
                return 'Não pode ser vazio';
            }
        } else if (nome === 'confirmarSenha') {
            if (this.state.hotelEncontrado === null && this.state.estado.botaoConfirmarCadastroVisivel) {
                const senha = this.state.senha;
                if (valor !== senha) {
                    return 'Confirmação da senha não confere';
                }
            }
        }
        return '';
    }

    validarFormulario() {
        const mensagensValidacao = Object.assign({}, this.state.mensagensValidacao);

        let temErro = false;

        for (let campo in mensagensValidacao) {
            const msg = this.validarCampo({ nome: campo });
            mensagensValidacao[campo] = msg;
            if (msg !== '') temErro = true;
        }
        this.setState({ mensagensValidacao });
        return !temErro;
    }


}

export default CadastroHotelForm;