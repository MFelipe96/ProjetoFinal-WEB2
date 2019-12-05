package br.ufscar.dc.web2.reservas.servicos;

import java.util.List;

import javax.annotation.Generated;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import br.ufscar.dc.web2.reservas.beans.Promocao;
import br.ufscar.dc.web2.reservas.dao.PromocaoDAO;

@ApplicationScoped
@Path("/promocao")
public class ServicosPromocao{
    
    @Inject PromocaoDAO PromocaoDAO;


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Promocao gravarUsuario(Promocao c) {
        return PromocaoDAO.gravarPromocao(c);
    }

    @GET
    @Path("/cidade")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Promocao> getPromocaoPorCidade(@QueryParam("cidade") String cidade) {
        return PromocaoDAO.listarPromocaoPorCidade(cidade);
    }

    @GET
    @Path("/hotel")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Promocao> getPromocaoPorCnpj(@QueryParam("cnpj") String cnpj) {
        return PromocaoDAO.listarPromocaoPorHotel(cnpj);
    
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Promocao getPromocao(@QueryParam("_id") String _id){
        return PromocaoDAO.buscarPromocao(_id);
    }
    @GET
    @Path("/cidades")
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getCidades(){
        return PromocaoDAO.listarCidades();
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/promocoes")
    public List<Promocao> getPromocoes(){
        return PromocaoDAO.listarPromocao();
    }

}