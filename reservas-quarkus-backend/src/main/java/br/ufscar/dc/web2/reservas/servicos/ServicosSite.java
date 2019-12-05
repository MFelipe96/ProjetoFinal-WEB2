package br.ufscar.dc.web2.reservas.servicos;


import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import br.ufscar.dc.web2.reservas.beans.Site;
import br.ufscar.dc.web2.reservas.dao.SiteDAO;

@ApplicationScoped
@Path("/site")
public class ServicosSite{
    
    @Inject SiteDAO SiteDAO;


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Site gravarUsuario(Site s) {
        return SiteDAO.gravarSite(s);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Site getSitePorUrl(@QueryParam("url") String url) {
        return SiteDAO.buscarSitePelaURL(url);
    }


}