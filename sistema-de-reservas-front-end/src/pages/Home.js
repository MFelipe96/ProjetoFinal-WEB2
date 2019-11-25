import React from 'react';


import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';


class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            filters: {},
            cidades: null,
            promocoes: null,
        };
    }

    async componentDidMount() {
        const responseCidades = await fetch('http://localhost:8080/promocao/cidades');
        var contentTypeSelecoes = responseCidades.headers.get("content-type");
        if (contentTypeSelecoes && contentTypeSelecoes.includes("application/json")) {
            const cidadesJson = await responseCidades.json();
            const cidadesOptions = cidadesJson.map((selecao) => { return { label: selecao, value: selecao }; });
            cidadesOptions.unshift( { label: 'Todas', value: null});
            this.setState({ cidades: cidadesOptions });
        }


        const responsePromocoes = await fetch('http://localhost:8080/promocao');
        var contentTypePromocoes = responsePromocoes.headers.get("content-type");
        if (contentTypePromocoes && contentTypePromocoes.includes("application/json")) {
            const promocoesJson = await responsePromocoes.json();
            this.setState({ promocoes: promocoesJson });
        }
    }


    onCidadeChange(e) {
        let filters = this.state.filters;
        filters['cidade'] = { value: e.value };
        this.setState({ filters: filters });
    }

    render() {
        var header = <div style={{ 'textAlign': 'left' }}>
            <i className="fa fa-search" style={{ margin: '4px 4px 0 0' }}></i>
        </div>;

        let cidadeFilter = <Dropdown style={{ width: '100%' }} className="ui-column-filter" value={this.state.filters.cidade ? this.state.filters.cidade.value : null} options={this.state.cidades} onChange={(e) => this.onCidadeChange(e)} />

        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Buscar por cidade</h1>
                    </div>
                </div>

                <div className="content-section implementation">
                    <DataTable value={this.state.promocoes} paginator={true} rows={10} header={header}>
                        <Column field="cidade" header="Cidade" filter={true} filterElement={cidadeFilter} filterMatchMode="equals" />
                    </DataTable>
                </div>
            </div>
        );
    }
}


export default Home;
