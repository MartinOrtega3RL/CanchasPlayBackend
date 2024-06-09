const { connection } = require("../../config");


const obtenerModulos = (req,res) => {


    const ConsultaModulos = "select * from modulos";

    connection.query(ConsultaModulos,(err,response)=> {
        if(err) {
            console.log(err);
        }
        res.send(response)
    })



}


module.exports = {obtenerModulos};