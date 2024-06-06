const { connection } = require("../../config");




function guardarDetalleReserva(idReserva,idPersona){


    const ConsultaIdPersona = `CALL SP_Obtener_idPersona_Reserva(?);`
    const InsertarDetallesReserva = "INSERT INTO detalles_reserva (Total_Pago,Estado_Pago,Fecha_Pago,Persona_id_Persona,Reserva_id_Reserva) VALUES (?,?,?,?,?)"

    connection.query(ConsultaIdPersona,[idReserva],(err,response) => {
        if(err){
            console.log(err);
            return;
        }

        if (idPersona == null) {
            idPersona = response[0][0].id_Persona;
        }

        connection.query(InsertarDetallesReserva,[1000,"Aprobado","2024-06-05",idPersona ,idReserva],(err,response) =>{
            if(err){
                console.log(err);
                return;
            }
        })
    })
    
}



module.exports = {guardarDetalleReserva};
