const { connection } = require("../../config");




function guardarDetalleReserva(idReserva,idPersona,Total_Reservada){


    const sp_ConsultaIdPersona = `CALL SP_Obtener_idPersona_Reserva(?);`
    const InsertarDetallesReserva = "INSERT INTO detalles_reserva (Total_Pago,Estado_Pago,Persona_id_Persona,Reserva_id_Reserva) VALUES (?,?,?,?)"

    connection.query(sp_ConsultaIdPersona,[idReserva],(err,response) => {
        if(err){
            console.log(err);
            return;
        }

        if (idPersona == null) {
            idPersona = response[0][0].id_Persona;
        }

        connection.query(InsertarDetallesReserva,[Total_Reservada,"Aprobado",idPersona ,idReserva],(err,response) =>{
            if(err){
                console.log(err);
                return;
            }
        })
    })
    
}



module.exports = {guardarDetalleReserva};
