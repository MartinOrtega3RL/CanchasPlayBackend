const { connection } = require("../../config");


const obtenerPerfil = (req,res) => {

    const {Nombre_Perfil} = req.body;
    const sp_ConsultaObtenerPerfil = "CALL SP_Obtener_Perfil(?)";   

    connection.query(sp_ConsultaObtenerPerfil,[Nombre_Perfil],(err,response) =>{
        if(err){
            console.log(err);
        }
        res.send(response[0]);
    })
}


module.exports = {obtenerPerfil}