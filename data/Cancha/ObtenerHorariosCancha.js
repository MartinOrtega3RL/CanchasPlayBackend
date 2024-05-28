const { connection } = require("../../config");


const ObtenerHorariosCancha = (req,res) => {

    const {idCancha} = req.body;
    
    const DatosHorarios = `SELECT id_Horarios_Canchas,Hora_Cancha,Fecha_Cancha,Estado_Hora 
    FROM horarios_canchas where Cancha_id_Cancha = ${idCancha}`

    connection.query(DatosHorarios,(err,response) => {
        if(err) return res.send(err);
        res.send(response);
    })
}

module.exports = {ObtenerHorariosCancha};