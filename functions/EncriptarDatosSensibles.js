var bcrypt = require('bcryptjs');



function EncriptarDatos(Dato){

    var salt = bcrypt.genSaltSync(10);
    var DatoEncriptado = bcrypt.hashSync(Dato, salt);

    return DatoEncriptado;
}

module.exports = {EncriptarDatos};