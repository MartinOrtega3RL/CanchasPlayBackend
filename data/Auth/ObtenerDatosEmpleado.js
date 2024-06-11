const { connection } = require("../../config");



const obtenerDatosEmpleado = (req,res) => {


    const { idPropietario } = req.body;

    const sp_Obtener_Datos_Empleado = "CALL SP_Obtener_Datos_Empleado(?)"

    connection.query(sp_Obtener_Datos_Empleado,[idPropietario],(err,response) =>{
        if (err) {
            console.log(err);
            return res.status(409).send("Error al insertar cuenta");
        }
        res.send(response[0]);

    })

}


module.exports = {obtenerDatosEmpleado}