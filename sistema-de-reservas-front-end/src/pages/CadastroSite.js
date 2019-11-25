class CadastroSite {
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

    static siteExistente() {
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

    static siteExistenteSenhaCorreta() {
        return {
            campoSenhaDesabilitado: false,
            eventoSenhaDesabilitado: false,
            camposDadosPessoaisDesabilitados: true,
            camposDadosCadastroDesabilitados: false,
            camposDadosCadastroDestaque: false,
            botaoEnvioDesabilitado: false,
            campoConfirmacaoSenhaVisivel: false,
            botaoConfirmarCadastroVisivel: false,
        };
    }

    static siteExistenteSenhaIncorreta() {
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


    static siteInexistente() {
        return {
            campoSenhaDesabilitado: false,
            eventoSenhaDesabilitado: true,
            camposDadosPessoaisDesabilitados: false,
            camposDadosCadastroDesabilitados: false,
            camposDadosCadastroDestaque: false,
            botaoEnvioDesabilitado: false,
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


export default CadastroSite;