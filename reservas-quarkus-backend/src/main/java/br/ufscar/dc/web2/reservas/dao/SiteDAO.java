package br.ufscar.dc.web2.reservas.dao;



import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;

import org.bson.Document;
import org.bson.types.ObjectId;

import br.ufscar.dc.web2.reservas.beans.Site;

@ApplicationScoped
public class SiteDAO {
    @Inject MongoClient mongoClient;

    private MongoCollection<Document> getCollection(){
        return mongoClient.getDatabase(MongoDBSchema.NOME_BANCO_DE_DADOS).getCollection(MongoDBSchema.COLECAO_SITE);
    }

    public Site gravarSite(Site s){

        Document document = new Document()
        .append(MongoDBSchema.SITE_CAMPOS.url.name(),s.getUrl())
        .append(MongoDBSchema.SITE_CAMPOS.nome.name(),s.getNome())
        .append(MongoDBSchema.SITE_CAMPOS.telefone.name(),s.getTelefone())
        .append(MongoDBSchema.SITE_CAMPOS.senha.name(),s.getSenha()); // usar scrypt depois https://github.com/wg/scrypt

        getCollection().insertOne(document);
        s.setId(document.getObjectId("_id").toString());
        return s;
    }

    public Site buscarSite(String id){
        Document Document = getCollection().find(Filters.eq("_id", new ObjectId(id))).first();
        if(Document != null) {
            Site s = new Site();
            s.setId(Document.getObjectId("_id").toString());
            s.setNome(Document.getString(MongoDBSchema.SITE_CAMPOS.nome.name()));
            s.setUrl(Document.getString(MongoDBSchema.SITE_CAMPOS.url.name()));
            s.setSenha(Document.getString(MongoDBSchema.SITE_CAMPOS.senha.name()));
            s.setTelefone(Document.getString(MongoDBSchema.SITE_CAMPOS.telefone.name()));
            return s;
        }
        return null;
    }

    public Site buscarSitePelaURL(String url) {
        Document Document = getCollection().find(Filters.eq("url", url)).first();
        if(Document != null) {
            Site s = new Site();
            s.setId(Document.getObjectId("_id").toString());
            s.setNome(Document.getString(MongoDBSchema.SITE_CAMPOS.nome.name()));
            s.setUrl(Document.getString(MongoDBSchema.SITE_CAMPOS.url.name()));
            s.setSenha(Document.getString(MongoDBSchema.SITE_CAMPOS.senha.name()));
            s.setTelefone(Document.getString(MongoDBSchema.SITE_CAMPOS.telefone.name()));
            return s;
        }
        return null;
    }


}