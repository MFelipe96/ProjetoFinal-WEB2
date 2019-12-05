package br.ufscar.dc.web2.reservas.beans;

import java.io.Serializable;
import java.util.Date;

public class Promocao implements Serializable {
    private String url;
    private String cnpj;
    private Date inicio;
    private Date fim;
    private double preco;
    private String id;

    public String getUrl() {
        return url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public Date getFim() {
        return fim;
    }

    public void setFim(Date fim) {
        this.fim = fim;
    }

    public Date getInicio() {
        return inicio;
    }

    public void setInicio(Date inicio) {
        this.inicio = inicio;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}

