import React from 'react';


import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Dropdown } from 'primereact/dropdown';
import Select from 'react-select';
import {DataScroller} from 'primereact/datascroller';
import { Icon, Label, Menu, Table, TableBody } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            rangeOptions:[{label:"Todos",value:3},{label:"Esta semana",value:1},{label:"Este mês",value:2},{label:"Este ano",value:4},{label:"Definir intervalo",value:5}],
            cidades: null,
            promocoes: null,
            cidade: null,
            promoExibe: null,
            filtro: 3
        };
    
    }

    async componentDidMount() {
        const responseCidades = await fetch('http://localhost:8080/promocao/cidades');
        var contentTypeSelecoes = responseCidades.headers.get("content-type");
        if (contentTypeSelecoes && contentTypeSelecoes.includes("application/json")) {
            const cidadesJson = await responseCidades.json();
            const cidadesOptions = cidadesJson.map((selecao) => { return { label: selecao, value: selecao }; });
            cidadesOptions.unshift( { label: 'Todas', value: null});
            console.log(cidadesOptions)
            this.setState({ cidades: cidadesOptions });
        }


        const responsePromocoes = await fetch('http://localhost:8080/promocao/promocoes');
        var contentTypePromocoes = responsePromocoes.headers.get("content-type");
        if (contentTypePromocoes && contentTypePromocoes.includes("application/json")) {
            const promocoesJson = await responsePromocoes.json();
            this.setState({ promocoes: promocoesJson });
            this.setState({promoExibe: promocoesJson})
            console.log(promocoesJson)
        }
    }


    async onCidadeChange(e) {
        this.setState({"cidade": e.value});
        let url
        if(e.value){
         url = 'http://localhost:8080/promocao/cidade?cidade='+e.value
        }
        else{
         url = 'http://localhost:8080/promocao/promocoes'
        }
        console.log("teste:"+url)
        const responsePromocoes = await fetch(url)
        var contentTypePromocoes = responsePromocoes.headers.get("content-type");
        if (contentTypePromocoes && contentTypePromocoes.includes("application/json")) {
            const promocoesJson =await responsePromocoes.json();
            this.setState({ promocoes: promocoesJson });
            this.setState({promoExibe: promocoesJson})
            this.onRangeChange({value:this.state.filtro})
            console.log(this.state.promocoes)
        }
    }

    
    async onRangeChange(e){
        var cur = new Date()
        this.setState({filtro:e.value})
        switch(e.value){
            case 5:
                console.log("Hewo")
                break
            case 2:
                var a =new Date(cur.getFullYear(),cur.getMonth())
                var b = new Date(cur.getFullYear(),cur.getMonth()+1)
                b.setSeconds(-1)
                var n = this.state.promocoes.filter(function(obj){
                    var d = obj.inicio
                    var hora1 = d.split(/[-:A-Z]/)
                    var data = new Date(hora1[0],hora1[1]-1,hora1[2],hora1[3],hora1[4],hora1[5])
                    return(data >= a && data <= b)
                })
                this.setState({promoExibe:n})
                break
            case 4:
                var a = new Date(cur.getFullYear(),0)
                var b = new Date(cur.getFullYear()+1,0)
                b.setSeconds(-1)
                console.log("a: "+a+" b: "+b)
                var n = this.state.promocoes.filter(function(obj){
                    var d = obj.inicio
                    var hora1 = d.split(/[-:A-Z]/)
                    var data = new Date(hora1[0],hora1[1]-1,hora1[2],hora1[3],hora1[4],hora1[5])
                    return(data >= a && data <= b)
                })
                this.setState({promoExibe:n})
                break
            case 1:
                var b = new Date(cur.getFullYear(),cur.getMonth(),(cur.getDay()-cur.getDay()%7)+7)
                var a = new Date(cur.getFullYear(),cur.getMonth(),(cur.getDay()-cur.getDay()%7)+1)
                console.log("a: "+a+" b: "+b)
                var n = this.state.promocoes.filter(function(obj){
                    var d = obj.inicio
                    var hora1 = d.split(/[-:A-Z]/)
                    var data = new Date(hora1[0],hora1[1]-1,hora1[2],hora1[3],hora1[4],hora1[5])
                    return(data >= a && data <= b)
                })
                this.setState({promoExibe:n})
                break
            case 3:
                        this.setState({ promoExibe: this.state.promocoes});
                    
                break


        }
    }
    tabelaCorpo(){
        if(this.state.promoExibe){
            var tabela = []
            
            //console.log(d)
        for(var i = 0;i<this.state.promoExibe.length;i++){
            var hora1 = this.state.promoExibe[i].inicio.split(/[-:A-Z]/)
            var d1 = new Date(hora1[0],hora1[1]-1,hora1[2],hora1[3],hora1[4],hora1[5])
            var hora2 = this.state.promoExibe[i].fim.split(/[-:A-Z]/)
            var d2 = new Date(hora2[0],hora2[1]-1,hora2[2],hora2[3],hora2[4],hora2[5])
            tabela.push(<Table.Row key={i}>
                <Table.Cell>{this.state.promoExibe[i].cnpj}</Table.Cell>
                <Table.Cell>{this.state.promoExibe[i].url}</Table.Cell>
                <Table.Cell>{d1.toLocaleDateString('pt-BR',{year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'})}</Table.Cell>
                <Table.Cell>{d2.toLocaleDateString('pt-BR',{year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'})}</Table.Cell>
                <Table.Cell>{this.state.promoExibe[i].preco}</Table.Cell>
                </Table.Row>)
        }
        return(tabela)
    }
    }
    render() {
       let tabela = (<Table celled color="teal" inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>hotel</Table.HeaderCell>
            <Table.HeaderCell>site</Table.HeaderCell>
            <Table.HeaderCell>inicio</Table.HeaderCell>
            <Table.HeaderCell>fim</Table.HeaderCell>
            <Table.HeaderCell>preco</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {this.tabelaCorpo()}
        </Table.Body>
        
        </Table>
        )
        return (
            <div>
               
            <h1>Buscar por cidade</h1>
            <Select options={this.state.rangeOptions} onChange={(e) => this.onRangeChange(e)}/>
            <Select options={this.state.cidades} onChange={(e) => this.onCidadeChange(e)}/>
            {tabela}      
            </div>
            


        );
    }
}
/*

 var header = <div style={{ 'textAlign': 'left' }}>
            <i className="fa fa-search" style={{ margin: '4px 4px 0 0' }}></i>
        </div>;

        let cidadeFilter = <Dropdown style={{ width: '100%' }} className="ui-column-filter" value={this.state.filters.cidade ? this.state.filters.cidade.value : null} options={this.state.cidades} onChange={(e) => this.onCidadeChange(e)} />





<div className="content-section implementation">
                    <DataTable value={this.state.promocoes} paginator={true} rows={10} header={header}>
                        <Column field="cnpj" header="cnpj" filter={true} filterElement={cidadeFilter} filterMatchMode="equals" />
                    </DataTable>
                </div>
*/
export default Home;
