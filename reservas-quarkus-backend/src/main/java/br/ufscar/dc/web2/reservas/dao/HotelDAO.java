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
import org.mvel2.util.ArrayTools;

import br.ufscar.dc.web2.reservas.beans.Hotel;
import br.ufscar.dc.web2.reservas.beans.Promocao;

@ApplicationScoped
public class HotelDAO {
    @Inject MongoClient mongoClient;

    private MongoCollection<Document> getCollection(){
        return mongoClient.getDatabase(MongoDBSchema.NOME_BANCO_DE_DADOS).getCollection(MongoDBSchema.COLECAO_HOTEL);
    }

    public Hotel gravarHotel(Hotel h){

        Document document = new Document()
        .append(MongoDBSchema.HOTEL_CAMPOS.cnpj.name(),h.getCnpj())
        .append(MongoDBSchema.HOTEL_CAMPOS.nome.name(),h.getNome())
        .append(MongoDBSchema.HOTEL_CAMPOS.cidade.name(),h.getCidade())
        .append(MongoDBSchema.HOTEL_CAMPOS.senha.name(),h.getSenha()); // usar scrypt depois https://github.com/wg/scrypt

        getCollection().insertOne(document);
        h.setId(document.getObjectId("_id").toString());
        return h;
    }

    public Hotel buscarHotel(String id){
        Document Document = getCollection().find(Filters.eq("_id", new ObjectId(id))).first();
        if(Document != null) {
            Hotel h = new Hotel();
            h.setId(Document.getObjectId("_id").toString());
            h.setNome(Document.getString(MongoDBSchema.HOTEL_CAMPOS.nome.name()));
            h.setCnpj(Document.getString(MongoDBSchema.HOTEL_CAMPOS.cnpj.name()));
            h.setSenha(Document.getString(MongoDBSchema.HOTEL_CAMPOS.senha.name()));
            h.setCidade(Document.getString(MongoDBSchema.HOTEL_CAMPOS.cidade.name()));
            return h;
        }
        return null;
    }

    public Hotel buscarHotelPeloCnpj(String cnpj) {
        Document Document = getCollection().find(Filters.eq("cnpj", cnpj)).first();
        if(Document != null) {
            Hotel h = new Hotel();
            h.setId(Document.getObjectId("_id").toString());
            h.setNome(Document.getString(MongoDBSchema.HOTEL_CAMPOS.nome.name()));
            h.setCnpj(Document.getString(MongoDBSchema.HOTEL_CAMPOS.cnpj.name()));
            h.setSenha(Document.getString(MongoDBSchema.HOTEL_CAMPOS.senha.name()));
            h.setCidade(Document.getString(MongoDBSchema.HOTEL_CAMPOS.cidade.name()));
            return h;
        }
        return null;
    }

    public List<String> buscarHotelPelaCidade(String cidade) {
        List<String> lista = new ArrayList<>();
        MongoCursor<Document> cursor = getCollection().find(Filters.eq("cidade", cidade)).iterator();
         while(cursor.hasNext()){
            Document Document = cursor.next();
            String cnpj = Document.getString(MongoDBSchema.HOTEL_CAMPOS.cnpj.name());
            lista.add(cnpj);
        }
       
  
        return lista;
    }

    public List<String> listarCidadesComPromocao(List<String> listaPromocao){
        List<String> listaCidades = new ArrayList<>();
        MongoCursor<Document> cursor = getCollection().find(Filters.in("cnpj",listaPromocao)).iterator();
        while(cursor.hasNext()){
            Document Document = cursor.next();
            String cidade = Document.getString(MongoDBSchema.HOTEL_CAMPOS.cidade.name());
            if(!listaCidades.contains(cidade)){
                listaCidades.add(cidade);
            }
        }


        return listaCidades;
    }


    }

