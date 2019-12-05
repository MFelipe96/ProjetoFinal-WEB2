/*async handlePeriodoPromocaoChanged() {
    if (this.validarCampo({ nome: 'promocao' }) !== '') return;
    this.mostrarAjaxLoader();
    try {
        const response = await fetch('http://localhost:8080/promocao?inicio=' + this.state.inicio & + "final=" + this.state.final);
        var contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const promocaoJson = await response.json();
            this.setState({
                estado: CadastroPromocao.promocaoExistente(),
                promocaoEncontrado: promocaoJson
            });
            this.mostrarAviso('Já existe uma promoção nesse período! Escolha uma nova data para cadastrar sua promoção');
        } else {
            this.setState({ estado: CadastroPromocao.promocaoInexistente(), promocaoEncontrado: null });
            this.mostrarInfo('Promoção ainda não cadastrada nesse período! Informe os seguintes dados para cadastrar');
        }
    } catch (e) {
        this.mostrarErro('Ocorreu um problema!');
        console.log(e);
    }
    this.ocultarAjaxLoader();
}
*/