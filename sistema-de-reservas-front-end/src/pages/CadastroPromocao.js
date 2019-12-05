class CadastroPromocao {
    static inicio() {
        return {
            campoSenhaDesabilitado: true,
            eventoSenhaDesabilitado: true,
            camposDadosPessoaisDesabilitados: true,
            camposDadosCadastroDesabilitados: true,
            camposDadosCadastroDestaque: false,
            botaoEnvioDesabilitado: true,
            campoConfirmacaoSenhaVisivel: false,
            botaoConfirmarCadastroVisivel: false,
        };
    }

    static hotelExistente() {
        return {
            campoSenhaDesabilitado: false,
            eventoSenhaDesabilitado: false,
            camposDadosPessoaisDesabilitados: true,
            camposDadosCadastroDesabilitados: true,
            camposDadosCadastroDestaque: false,
            botaoEnvioDesabilitado: true,
            campoConfirmacaoSenhaVisivel: false,
            botaoConfirmarCadastroVisivel: false,
        };
    }

    static hotelExistenteSenhaCorreta() {
        return {
            campoSenhaDesabilitado: false,
            eventoSenhaDesabilitado: false,
            camposDadosPessoaisDesabilitados: false,
            camposDadosCadastroDesabilitados: false,
            camposDadosCadastroDestaque: false,
            botaoEnvioDesabilitado: false,
            campoConfirmacaoSenhaVisivel: false,
            botaoConfirmarCadastroVisivel: false,
        };
    }

    static hotelExistenteSenhaIncorreta() {
        return {
            campoSenhaDesabilitado: false,
            eventoSenhaDesabilitado: false,
            camposDadosPessoaisDesabilitados: true,
            camposDadosCadastroDesabilitados: true,
            camposDadosCadastroDestaque: false,
            botaoEnvioDesabilitado: true,
            campoConfirmacaoSenhaVisivel: false,
            botaoConfirmarCadastroVisivel: false,
        };
    }


    static hotelInexistente() {
        return {
            campoSenhaDesabilitado: true,
            eventoSenhaDesabilitado: true,
            camposDadosPessoaisDesabilitados: true,
            camposDadosCadastroDesabilitados: true,
            camposDadosCadastroDestaque: true,
            botaoEnvioDesabilitado: true,
            campoConfirmacaoSenhaVisivel: false,
            botaoConfirmarCadastroVisivel: false,
        };
    }


    static confirmarCadastroSiteExistente() {
        return {
            campoSenhaDesabilitado: false,
            eventoSenhaDesabilitado: true,
            camposDadosPessoaisDesabilitados: false,
            camposDadosCadastroDesabilitados: false,
            camposDadosCadastroDestaque: true,
            botaoEnvioDesabilitado: false,
            campoConfirmacaoSenhaVisivel: false,
            botaoConfirmarCadastroVisivel: true,
        };
    }


    static confirmarCadastroSiteInexistente() {
        return {
            campoSenhaDesabilitado: false,
            eventoSenhaDesabilitado: true,
            camposDadosPessoaisDesabilitados: false,
            camposDadosCadastroDesabilitados: false,
            camposDadosCadastroDestaque: true,
            botaoEnvioDesabilitado: false,
            campoConfirmacaoSenhaVisivel: true,
            botaoConfirmarCadastroVisivel: true,
        };
    }
}


export default CadastroPromocao;