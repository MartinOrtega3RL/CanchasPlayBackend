const { connection } = require("../../config");



const obtenerInfoReserva = (req,res) => {

    const {idPropietario} = req.body;

    const sp_ObtenerDatosReserva = "CALL SP_Obtener_Datos_Reserva(?)";

    connection.query(sp_ObtenerDatosReserva,[idPropietario],(err,response) => {
        if(err){
            console.log(err);
            return;
        }
        res.send(response[0]);
    })
} 

module.exports = {obtenerInfoReserva};