package br.ufscar.dc.web2.reservas.dao;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;

import org.bson.Document;
import org.bson.types.ObjectId;

import br.ufscar.dc.web2.reservas.beans.Promocao;

@ApplicationScoped
public class PromocaoDAO{
    @Inject MongoClient mongoClient;
    @Inject HotelDAO hotelDAO;
    @Inject SiteDAO siteDAO;

    private MongoCollection<Document> getCollection(){
        return mongoClient.getDatabase(MongoDBSchema.NOME_BANCO_DE_DADOS).getCollection(MongoDBSchema.COLECAO_PROMOCAO);
    }

    public Promocao gravarPromocao(Promocao p){
        Document document = new Document()
        .append(MongoDBSchema.PROMOCAO_CAMPOS.url.name(),p.getUrl())
        .append(MongoDBSchema.PROMOCAO_CAMPOS.cnpj.name(),p.getCnpj())
        .append(MongoDBSchema.PROMOCAO_CAMPOS.inicio.name(),p.getInicio())
        .append(MongoDBSchema.PROMOCAO_CAMPOS.fim.name(),p.getFim())
        .append(MongoDBSchema.PROMOCAO_CAMPOS.preco.name(),p.getPreco());
        getCollection().insertOne(document);
        p.setId(document.getObjectId("_id").toString());
        return p;
    }
    public Promocao buscarPromocao(String id){
        Document Document = getCollection().find(Filters.eq("_id", new ObjectId(id))).first();
        if(Document != null) {
            Promocao p = new Promocao();
            p.setId(Document.getObjectId("_id").toString());
            p.setUrl(Document.getString(MongoDBSchema.PROMOCAO_CAMPOS.url.name()));
            p.setCnpj(Document.getString(MongoDBSchema.PROMOCAO_CAMPOS.cnpj.name()));
            p.setInicio(Document.getDate(MongoDBSchema.PROMOCAO_CAMPOS.inicio.name()));
            p.setFim(Document.getDate(MongoDBSchema.PROMOCAO_CAMPOS.fim.name()));
            p.setPreco(Document.getDouble(MongoDBSchema.PROMOCAO_CAMPOS.preco.name()));
            return p;
        }
        return null;
    }

    public List<Promocao> listarPromocao(){
        List<Promocao> listaPromocao = new ArrayList<>();
        MongoCursor<Document> cursor = getCollection().find().iterator();
        while(cursor.hasNext()){
            Document Document = cursor.next();
            Promocao p = new Promocao();
            p.setId(Document.getObjectId("_id").toString());
            p.setUrl(Document.getString(MongoDBSchema.PROMOCAO_CAMPOS.url.name()));
            p.setCnpj(Document.getString(MongoDBSchema.PROMOCAO_CAMPOS.cnpj.name()));
            p.setInicio(Document.getDate(MongoDBSchema.PROMOCAO_CAMPOS.inicio.name()));
            p.setFim(Document.getDate(MongoDBSchema.PROMOCAO_CAMPOS.fim.name()));
            p.setPreco(Document.getDouble(MongoDBSchema.PROMOCAO_CAMPOS.preco.name()));
            listaPromocao.add(p);
        }
        
        return listaPromocao;
    }

    public List<String> listarPromocaoCnpj(){
        List<String> listaPromocao = new ArrayList<>();
        MongoCursor<Document> cursor = getCollection().find().iterator();
        while(cursor.hasNext()){
            Document Document = cursor.next();
            String p;
            p = Document.getString(MongoDBSchema.PROMOCAO_CAMPOS.cnpj.name());
           
            listaPromocao.add(p);
        }
        return listaPromocao;
    }


    public List<String> listarCidades(){
        List<String> listaCidade = new ArrayList<>();
        List<String> listaPromocao;
         listaPromocao = listarPromocaoCnpj();
         listaCidade = hotelDAO.listarCidadesComPromocao(listaPromocao);
        return listaCidade;
    }

    public List<Promocao> listarPromocaoPorCidade(String cidade){
        List<String> listaHotel = hotelDAO.buscarHotelPelaCidade(cidade);
        MongoCursor<Document> cursor = getCollection().find(Filters.in("cnpj",listaHotel)).iterator();
        List<Promocao> listaPromocao = new ArrayList<>();
        while(cursor.hasNext()){
            Document Document = cursor.next();
            Promocao p = new Promocao();
            p.setId(Document.getObjectId("_id").toString());
            p.setUrl(Document.getString(MongoDBSchema.PROMOCAO_CAMPOS.url.name()));
            p.setCnpj(Document.getString(MongoDBSchema.PROMOCAO_CAMPOS.cnpj.name()));
            p.setInicio(Document.getDate(MongoDBSchema.PROMOCAO_CAMPOS.inicio.name()));
            p.setFim(Document.getDate(MongoDBSchema.PROMOCAO_CAMPOS.fim.name()));
            p.setPreco(Document.getDouble(MongoDBSchema.PROMOCAO_CAMPOS.preco.name()));
            listaPromocao.add(p);
        }
        
        return listaPromocao;
    }

    public List<Promocao> listarPromocaoPorHotel(String cnpj){

        
        List<Promocao> listaPromocao = new ArrayList<>();
        try(MongoCursor<Document> cursor = getCollection().find(Filters.eq("cnpj", cnpj)).iterator()){
        while(cursor.hasNext()){
            Document Document = cursor.next();
            Promocao p = new Promocao();
            p.setId(Document.getObjectId("_id").toString());
            p.setUrl(Document.getString(MongoDBSchema.PROMOCAO_CAMPOS.url.name()));
            p.setCnpj(Document.getString(MongoDBSchema.PROMOCAO_CAMPOS.cnpj.name()));
            p.setInicio(Document.getDate(MongoDBSchema.PROMOCAO_CAMPOS.inicio.name()));
            p.setFim(Document.getDate(MongoDBSchema.PROMOCAO_CAMPOS.fim.name()));
            p.setPreco(Document.getDouble(MongoDBSchema.PROMOCAO_CAMPOS.preco.name()));
            listaPromocao.add(p);
        }
    }
    
        return listaPromocao;
    }


    public List<Promocao> listarPromocaoPorSite(String url){

        
        List<Promocao> listaPromocao = new ArrayList<>();
        try(MongoCursor<Document> cursor = getCollection().find(Filters.eq("url", url)).iterator()){
        while(cursor.hasNext()){
            Document Document = cursor.next();
            Promocao p = new Promocao();
            p.setId(Document.getObjectId("_id").toString());
            p.setUrl(Document.getString(MongoDBSchema.PROMOCAO_CAMPOS.url.name()));
            p.setCnpj(Document.getString(MongoDBSchema.PROMOCAO_CAMPOS.cnpj.name()));
            p.setInicio(Document.getDate(MongoDBSchema.PROMOCAO_CAMPOS.inicio.name()));
            p.setFim(Document.getDate(MongoDBSchema.PROMOCAO_CAMPOS.fim.name()));
            p.setPreco(Document.getDouble(MongoDBSchema.PROMOCAO_CAMPOS.preco.name()));
            listaPromocao.add(p);
        }
    }
    
        return listaPromocao;
    }
}