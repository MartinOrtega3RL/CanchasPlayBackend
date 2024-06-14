const { connection } = require("../config");

// Función para realizar la consulta a la base de datos y devolver una promesa
const getIdPropietario = (idComplejo) => {
    return new Promise((resolve, reject) => {
        const ConsultaIdPropietario = `SELECT id_Propietario FROM complejo cm
            JOIN propietario pr ON cm.Propietario_id_Propietario = pr.id_Propietario
            WHERE id_Complejo = ${idComplejo}`;

        connection.query(ConsultaIdPropietario, (err, response) => {
            if (err) {
                return reject(err);
            }
            resolve(response[0].id_Propietario);
        });
    });
};


module.exports = {getIdPropietario}