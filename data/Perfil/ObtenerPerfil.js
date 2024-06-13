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
    const ConsultarPerfiles = `select id_Perfil,Nombre_Perfil,Descripcion_Perfil from perfil where propietario_id_Propietario = ${idPropietario}`

    connection.query(ConsultarPerfiles,(err,response) => {
        if(err){
            console.log(err);
        }
        res.send(response)
    })


}

const obtenerPerfilEmpleado = (req,res) => {
    
    const {idEmpleado} = req.body;
    console.log(req.body)
    const ConsultaPerfilEmpleado = `select id_Perfil,Nombre_Perfil from empleado em
    join perfil pr on em.Perfil_id_Perfil = pr.id_Perfil
    where em.id_Empleado = ${idEmpleado}`


    connection.query(ConsultaPerfilEmpleado,(err,response) => {
        if(err){
            console.log(err);
            return;
        }
        res.send(response);
    })




}

module.exports = {obtenerPerfil,obtenerMisPerfiles,obtenerPerfilEmpleado}