import React from 'react'
import CadastroPromocao from './CadastroPromocao'
import DatePicker from 'react-datepicker';
import { Button } from 'semantic-ui-react';

class CadastroPromocaoForm extends React.Component{
    constructor(){
        super()
        this.state = {
        url: '',
        cnpj: '',
        senha: '',
        inicio: new Date(),
        fim: new Date(),
        inicioString: '',
        fimString: '',
        preco: '',
        estado:CadastroPromocao.inicio(),
        mensagem:"Digite cnpj e senha para continuar",
        hotelEncontrado: null,
        mensagensValidacao:{
            url: '',
            cnpj: '',
            senha: '',
            inicio: '',
            fim: '',
            preco: ''
        }
       

        }
    }

    async handleEmailChanged() {
        if (this.validarCampo({ nome: 'cnpj' }) !== '') return;
        this.mostrarAjaxLoader();
        try {
            const response = await fetch('http://localhost:8080/hotel?cnpj=' + this.state.cnpj);
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const hotelJson = await response.json();
                this.setState({
                    estado: CadastroPromocao.hotelExistente(),
                    hotelEncontrado: hotelJson
                });
                this.mostrarAviso('URL já cadastrado! Informe sua senha para cadastrar o seu site ');
            } else {
                this.setState({ estado: CadastroPromocao.hotelInexistente() });
                this.mostrarInfo('URL ainda não cadastrado! Informe uma nova senha e demais dados para cadastro');
            }
        } catch (e) {
            this.mostrarErro('Ocorreu um problema!');
            console.log(e);
        }
        this.ocultarAjaxLoader();
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


    handleSenhaChanged() {
        if (!this.state.estado.eventoSenhaDesabilitado) {
            if (this.state.senha === this.state.hotelEncontrado.senha) {
                this.setState({
                    nome: this.state.hotelEncontrado.nome,
                    telefone: this.state.hotelEncontrado.telefone,
                });
                this.setState({ estado: CadastroPromocao.hotelExistenteSenhaCorreta() });
                this.mostrarSucesso('Senha correta!');


            } else {
                this.setState({ estado: CadastroPromocao.hotelExistenteSenhaIncorreta() });
                this.mostrarErro('Senha incorreta! Informe novamente!');
            }
        }
    }


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
            } else if (this.state.hotelEncontrado === null) {
                if (valor.length < 6) {
                    return 'Senha muito curta';
                }
            }
        } else if (nome === 'nome' || nome === 'telefone') {
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



    parseMonth(month){
        switch(month){
            case 'Dec':
                return ('12')
                
            case 'Nov':
                return ('11')          
            case 'Oct':
                return ('10')
            case 'Sep':
                return ('9')
            case 'Aug':
                return ('8')
            case 'Jul':
                return ('7')
            case 'Jun':
                return ('6')
            case 'May':
                return ('5')
            case 'Apr':
                return ('4')
            case 'Mar':
                return ('3')
            case 'Feb':
                return ('2')
            case 'Jan':
                return ('1')
        }
    }
    changeDate(date,s){
        var str = ''
        if(s === 1){
        this.setState({inicio:date})
        str += date.toString()
        var partes = str.split(/[" :"]/)
        //console.log(partes)
        var ret = partes[3]+'-'+this.parseMonth(partes[1])+'-'+partes[2]+'T'+partes[4]+':'+partes[5]+':'+partes[6]+'Z[UTC]'
            console.log(ret)
            this.setState({inicioString:ret})
        }
        else{
            this.setState({fim:date})
            str += date.toString()
            var partes = str.split(/[" :"]/)
          //  console.log(partes)
            var ret = partes[3]+'-'+this.parseMonth(partes[1])+'-'+partes[2]+'T'+partes[4]+':'+partes[5]+':'+partes[6]+'Z[UTC]'
            console.log(ret)
            this.setState({fimString:ret})
            }
    }

    date(){
        if(!this.state.estado.camposDadosPessoaisDesabilitados){
        return(
            <div className="picker">
        <div className='item'><DatePicker selected={this.state.inicio}  onChange={date=>this.changeDate(date,1)} showTimeSelect inline/></div>
        <div className='item'> <DatePicker selected={this.state.fim}   onChange={date=>this.changeDate(date,2)} showTimeSelect inline/> </div>
        </div>
        )
        }
        else{
        return(
            <div></div>
        )
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
                url: this.state.url,
                inicio: this.state.inicioString,
                fim: this.state.fimString,
                preco: parseFloat(this.state.preco),
                cnpj: this.state.cnpj
            };
            console.log(novoCadastro)
            const response = await fetch('http://localhost:8080/promocao',{
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(novoCadastro)
        })

            this.mostrarSucesso(`Obrigado pela preferência, ${this.state.nome}!`);
            this.setState({
                url: '',
                senha: '',
                nome: '',
                telefone: '',
                confirmarSenha: '',
                siteEncontrado: null,
            });
            this.setState({ estado: CadastroPromocao.inicio() });
        } catch (e) {
            this.mostrarErro('Ocorreu um problema!');
            console.log(e);
        }
        this.ocultarAjaxLoader();
    }









    botao(){
        if(this.state.inicio<this.state.fim && this.state.url !== '' && this.state.preco !== '' ){
            console.log("pronto")
           return( <Button onClick={()=>this.handleConfirmarCadastroClicked()}>
                Enviar!
                </Button>
           )
        }
    }

    mostrarAviso(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-warning', }); }
    mostrarInfo(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-info', }); }
    mostrarSucesso(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-success', }); }
    mostrarErro(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-danger', }); }
    mostrarAjaxLoader() { this.setState({ mostrarAjaxLoader: true }); }
    ocultarAjaxLoader() { this.setState({ mostrarAjaxLoader: false }); }

    render(){
    return(
        <div className = "row">
            <div className="col-lg-12 text-center">
            <h4>Cadastrar Promoção</h4>
                    <form className="form-horizontal" name="formCadastro">
                        <div className={this.state.mensagemClassName}>
                            {this.state.mensagem}
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-6">
                                    <label className="col-sm-2 control-label" htmlFor="cnpj">CNPJ</label>
                                    <div className="col-sm-10">
                                        <input type="cnpj"
                                            className="form-control"
                                            name="cnpj"
                                            label="cnpj"
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
                                    <label className="col-sm-3 control-label" htmlFor="url">url</label>
                                    <div className="col-sm-9">
                                        <input type="text"
                                            className="form-control"
                                            name="url"
                                            label="url"
                                            disabled={this.state.estado.camposDadosPessoaisDesabilitados}
                                            value={this.state.url}
                                            onChange={(event) => this.handleUserInput(event)}>
                                        </input>
                                        <span className="text text-danger">{this.state.mensagensValidacao['url']}</span>
                                    </div>
                                </div>
                                <div className="col-xs-6">
                                    <label className="col-sm-2 control-label" htmlFor="preco">Preço</label>
                                    <div className="col-sm-10">
                                        <input type="number"
                                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                            className="form-control"
                                            name="preco"
                                            label="preco"
                                            disabled={this.state.estado.camposDadosPessoaisDesabilitados}
                                            value={this.state.preco}
                                            onChange={(event) => this.handleUserInput(event)}>
                                        </input>
                                        <span className="text text-danger">{this.state.mensagensValidacao['preco']}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
        </form>
        {this.date()}

        {this.botao()}
        </div>
        </div>
    )
    }
    
}
export default CadastroPromocaoForm
