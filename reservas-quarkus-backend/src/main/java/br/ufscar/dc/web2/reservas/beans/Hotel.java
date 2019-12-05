package br.ufscar.dc.web2.reservas.beans;

import java.io.Serializable;

public class Hotel implements Serializable {
    private String id;
    private String cnpj;
    private String nome;
    private String senha;
    private String cidade;

    public String getCnpj() {
        return cnpj;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }
    

}