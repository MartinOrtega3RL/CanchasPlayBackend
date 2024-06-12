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

const obtenerMisPerfiles = (req,res) => {

    const {idPropietario} = req.body;
    console.log(idPropietario)
    const ConsultarPerfiles = `select id_Perfil,Nombre_Perfil,Descripcion_Perfil from perfil where propietario_id_Propietario = ${idPropietario}`

    connection.query(ConsultarPerfiles,(err,response) => {
        if(err){
            console.log(err);
        }
        res.send(response)
    })


}

module.exports = {obtenerPerfil,obtenerMisPerfiles}