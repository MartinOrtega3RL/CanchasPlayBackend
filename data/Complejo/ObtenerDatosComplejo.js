const { connection } = require("../../config")





const obtenerDatosComplejo = (req,res) => {

    const DatosComplejo = "Select id_Complejo, Nombre_Complejo,Ubicacion,Logo_Complejo from complejo"

    connection.query(DatosComplejo,(err,response) => {
        if(err) return res.send(err);
        res.send(response);
    })
}




module.exports = {obtenerDatosComplejo}
