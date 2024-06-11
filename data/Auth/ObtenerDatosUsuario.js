const { connection } = require("../../config");



const obtenerDatosUsuario = (req,res) => {
    
    const {id_Sub} = req.body;

    const sp_ConsultaCuentaUsuario = "CALL SP_Obtener_Cuenta_Usuario(?)";
    try {
        connection.query(sp_ConsultaCuentaUsuario,[id_Sub],(err,response) => {
            if(err){
                console.log(err);
            }
            res.send(response[0])
        })
    } catch (error) {
        res.send("Error")
    }
}



module.exports = {obtenerDatosUsuario}