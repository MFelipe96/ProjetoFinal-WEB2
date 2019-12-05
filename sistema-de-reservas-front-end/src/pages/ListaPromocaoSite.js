import React from 'react'

import { Icon, Label, Menu, Table, TableBody } from 'semantic-ui-react'

class ListaPromocaoSite extends React.Component{
    constructor(){
        super()
        this.state = {
            promocoes: null,
            site: "Teste.com" // quando o login estiver pronto isso deve depender da sessão
        }
    }
    async componentDidMount(){
        const responsePromocoes = await fetch('http://localhost:8080/promocao/site?url='+this.state.site);
        var contentTypePromocoes = responsePromocoes.headers.get("content-type");
        if (contentTypePromocoes && contentTypePromocoes.includes("application/json")) {
            const promocoesJson = await responsePromocoes.json();
            this.setState({ promocoes: promocoesJson });
            console.log(promocoesJson)
    }
}


tabelaCorpo(){
    if(this.state.promocoes){
        var tabela = []
        
    for(var i = 0;i<this.state.promocoes.length;i++){
        var hora1 = this.state.promocoes[i].inicio.split(/[-:A-Z]/)
        var d1 = new Date(hora1[0],hora1[1]-1,hora1[2],hora1[3],hora1[4],hora1[5])
        var hora2 = this.state.promocoes[i].fim.split(/[-:A-Z]/)
        var d2 = new Date(hora2[0],hora2[1]-1,hora2[2],hora2[3],hora2[4],hora2[5])
        tabela.push(<Table.Row key={i}>
            <Table.Cell>{this.state.promocoes[i].cnpj}</Table.Cell>
            <Table.Cell>{this.state.promocoes[i].url}</Table.Cell>
            <Table.Cell>{d1.toLocaleDateString('pt-BR',{year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'})}</Table.Cell>
            <Table.Cell>{d2.toLocaleDateString('pt-BR',{year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'})}</Table.Cell>
            <Table.Cell>{this.state.promocoes[i].preco}</Table.Cell>
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
    return(
        <div>
            {tabela}
        </div>
    )
    }
}

export default ListaPromocaoSite