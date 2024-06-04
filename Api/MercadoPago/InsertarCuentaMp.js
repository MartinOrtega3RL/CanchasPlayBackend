const { URL } = require('url'); // Importa el módulo URL de Node.js
const { storeTokens } = require('../../functions/MercadoPago/StoreTokens');
require('dotenv').config();




const crearAcessToken = (req, res) => {
    const propietarioId = 2; //<- aca deberia recibir el idPropietario enviado desde el front

    const url = new URL(req.url, `${process.env.MP_REDIRECT_URI}createAccessToken`); // Reemplaza con tu dominio real
    // Obtén el valor del parámetro 'code' de la URL
    const codigoAutorizacion = url.searchParams.get('code');
    // Aquí puedes manejar el código de autorización como lo necesites
    storeTokens(codigoAutorizacion,propietarioId, res);
    res.send("¡Creado con exito!")
};



module.exports = {crearAcessToken}