const { connection } = require("../../config");


const obtenerPubicKey = (req,res) => {

    const {idComplejo} = req.body

    const ConsultaIdPropietario = `select Propietario_id_Propietario from complejo where id_Complejo = ${idComplejo}`
    const ConsultaPublicKey = `SELECT publicKey FROM cuenta_mercadopago WHERE Propietario_id_Propietario = ?`;
    

    connection.query(ConsultaIdPropietario,(err,response) => {
        if(err){
            console.log(err);
        }
        const idPropietario = response[0].Propietario_id_Propietario;
        
        connection.query(ConsultaPublicKey,[idPropietario],(err,response) => {
            if(err){
                console.log(err);
            }
    
            res.send(response[0].publicKey);
        })
    })
}


module.exports = {obtenerPubicKey};