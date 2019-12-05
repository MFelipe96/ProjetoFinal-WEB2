
package br.ufscar.dc.web2.reservas.dao;


public class MongoDBSchema {
    public final static String NOME_BANCO_DE_DADOS = "reservas";
    public final static String COLECAO_SITE = "site";
    public final static String COLECAO_HOTEL = "hotel";
    public final static String COLECAO_PROMOCAO = "promocao";
    public static enum SITE_CAMPOS {
        nome, url, senha, telefone
    };
    public static enum HOTEL_CAMPOS {
       nome,senha,cnpj,cidade
    };
    public static enum PROMOCAO_CAMPOS{
        url,cnpj,preco,inicio,fim
    }
}