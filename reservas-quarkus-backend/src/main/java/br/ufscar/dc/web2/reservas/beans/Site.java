package br.ufscar.dc.web2.reservas.beans;

import java.io.Serializable;

public class Site implements Serializable {
    private String id;
    private String url;
    private String senha;
    private String nome;
    private String telefone;

    public String getUrl() {
        return url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setUrl(String url) {
        this.url = url;
    }



}