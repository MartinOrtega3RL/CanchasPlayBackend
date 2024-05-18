const connection = require("../../config");



const EliminarComplejo = (req,res) => {

    const {idComplejo} = req.body

    const EliminarHorario = `DELETE FROM horarios_complejo where Complejo_id_Complejo = ${idComplejo}`
    const EliminarComplejo = `DELETE FROM complejo where id_Complejo = ${idComplejo}`

    connection.query(EliminarHorario,(err,response) => {
        if(err) return res.send(err);
        connection.query(EliminarComplejo,(err,response) => {
            if(err) return res.send(err);
            res.send(response);
        })    
    })
}


module.exports = {EliminarComplejo}