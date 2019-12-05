import React from 'react';
import CadastroSite from './CadastroSite';
import {Link} from 'react-router-dom';


class CadastroSiteForm extends React.Component {
    constructor() {
        super();
        this.state = {
            url: '',
            senha: '',
            nome: '',
            telefone: '',
            estado: CadastroSite.inicio(),
            mensagem: 'Digite sua url para dar início',
            mensagemClassName: 'alert alert-info',
            siteEncontrado: null,
            mostrarAjaxLoader: false,
            mensagensValidacao: {
                url: '',
                senha: '',
                nome: '',
                telefone: '',
                confirmarSenha: '',
            },
        };
    }


    render() {
        return (
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h4>Cadastrar Site de Reservas</h4>
                    <form className="form-horizontal" name="formCadastro">
                        <div className={this.state.mensagemClassName}>
                            {this.state.mensagem}
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-6">
                                    <label className="col-sm-2 control-label" htmlFor="url">URL</label>
                                    <div className="col-sm-10">
                                        <input type="url"
                                            className="form-control"
                                            name="url"
                                            label="URL"
                                            value={this.state.url}
                                            onChange={(event) => this.handleUserInput(event)}
                                            onBlur={() => this.handleUrlChanged()}>
                                        </input>
                                        <span className="text text-danger">{this.state.mensagensValidacao['url']}</span>
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
                                    <label className="col-sm-3 control-label" htmlFor="nome">Nome do site</label>
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
                                    <label className="col-sm-2 control-label" htmlFor="telefone">Telefone</label>
                                    <div className="col-sm-10">
                                        <input type="tel"
                                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                            className="form-control"
                                            name="telefone"
                                            label="Telefone"
                                            disabled={this.state.estado.camposDadosPessoaisDesabilitados}
                                            value={this.state.telefone}
                                            onChange={(event) => this.handleUserInput(event)}>
                                        </input>
                                        <span className="text text-danger">{this.state.mensagensValidacao['telefone']}</span>
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

    async handleUrlChanged() {
        if (this.validarCampo({ nome: 'url' }) !== '') return;
        this.mostrarAjaxLoader();
        try {
            const response = await fetch('http://localhost:8080/site?url=' + this.state.url);
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const siteJson = await response.json();
                this.setState({
                    estado: CadastroSite.siteExistente(),
                    siteEncontrado: siteJson
                });
                this.mostrarAviso('URL já cadastrado! Informe uma nova url para cadastrar o seu site ');
            } else {
                this.setState({ estado: CadastroSite.siteInexistente(), siteEncontrado: null });
                this.mostrarInfo('URL ainda não cadastrado! Informe uma nova senha e demais dados para cadastro');
            }
        } catch (e) {
            this.mostrarErro('Ocorreu um problema!');
            console.log(e);
        }
        this.ocultarAjaxLoader();
    }

    handleSenhaChanged() {
        if (!this.state.estado.eventoSenhaDesabilitado) {
            if (this.state.senha === this.state.siteEncontrado.senha) {
                this.setState({
                    nome: this.state.siteEncontrado.nome,
                    telefone: this.state.siteEncontrado.telefone,
                });
                this.setState({ estado: CadastroSite.siteExistenteSenhaCorreta() });
                this.mostrarSucesso('Senha correta!');


            } else {
                this.setState({ estado: CadastroSite.siteExistenteSenhaIncorreta() });
                this.mostrarErro('Senha incorreta! Informe novamente!');
            }
        }
    }

    handleEnviarCadastroClicked() {
        if (!this.validarFormulario()) {
            this.mostrarErro('Atenção! Alguns campos não foram corretamente preenchidos!');
            return;
        }
        if (this.state.siteEncontrado === null) {
            this.setState({ estado: CadastroSite.confirmarCadastroSiteInexistente() });
            this.mostrarInfo('Verifique os dados e repita sua nova senha.');
        } else {
            this.setState({ estado: CadastroSite.confirmarCadastroSiteExistente() });
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
            const novoSiteDefault = {
                nome: this.state.nome,
                senha: this.state.senha,
                url: this.state.url,
                telefone: this.state.telefone,
            };
            if (this.state.siteEncontrado === null) {
                const novoSite = {
                    nome: this.state.nome,
                    senha: this.state.senha,
                    url: this.state.url,
                    telefone: this.state.telefone,
                };
                const response = await fetch('http://localhost:8080/site', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(novoSite),
                });
            }
            this.mostrarSucesso(`Obrigado pela preferência, ${this.state.nome}!`);
            this.setState({
                url: '',
                senha: '',
                nome: '',
                telefone: '',
                confirmarSenha: '',
                siteEncontrado: null,
            });
            this.setState({ estado: CadastroSite.inicio() });
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


        if (nome === 'url') {
            //fazer uma verificação valida para url
            if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(valor)) {
                return 'URL está em formato incorreto';
            }
        } else if (nome === 'senha') {
            if (valor.length === 0) {
                return 'Senha não pode ser vazia';
            } else if (this.state.siteEncontrado === null) {
                if (valor.length < 6) {
                    return 'Senha muito curta';
                }
            }
        } else if (nome === 'nome' || nome === 'telefone') {
            if (valor === '') {
                return 'Não pode ser vazio';
            }
        } else if (nome === 'confirmarSenha') {
            if (this.state.siteEncontrado === null && this.state.estado.botaoConfirmarCadastroVisivel) {
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

export default CadastroSiteForm;