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

import br.ufscar.dc.web2.reservas.beans.Hotel;
import br.ufscar.dc.web2.reservas.dao.HotelDAO;

@ApplicationScoped
@Path("/hotel")
public class ServicosHotel{
    
    @Inject HotelDAO hotelDAO;


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Hotel gravarUsuario(Hotel h) {
        return hotelDAO.gravarHotel(h);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Hotel getHotelPorCnpj(@QueryParam("cnpj") String cnpj) {
        return hotelDAO.buscarHotelPeloCnpj(cnpj);
    }


}