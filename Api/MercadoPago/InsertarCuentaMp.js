const { URL } = require('url'); // Importa el módulo URL de Node.js
const { storeTokens } = require('../../functions/MercadoPago/StoreTokens');
const crypto = require('crypto');

const generarURLAutorizacion = (req, res) => {
    const { idPropietario } = req.body;
    const state = crypto.randomBytes(16).toString('hex'); // Genera un identificador único
    const clientId = process.env.MP_CLIENT_ID;
    const redirectUri = `${process.env.MP_REDIRECT_URI}createAccessToken`;

    // Construir la URL de autorización
    const urlAutorizacion = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;

    // Almacenar temporalmente el idPropietario asociado con el state en algún lugar seguro (base de datos o caché)
    // Aquí simplemente lo guardamos en una variable global (no recomendado para producción)
    global.tempStorage = global.tempStorage || {};
    global.tempStorage[state] = idPropietario;

    res.json({ urlAutorizacion });

};

const crearAcessToken = (req, res) => {
    const url = new URL(req.url, `${process.env.MP_REDIRECT_URI}/createAccessToken`);
    const codigoAutorizacion = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!codigoAutorizacion || !state) {
        return res.status(400).send("Código de autorización o estado no proporcionados");
    }
    const idPropietario = global.tempStorage && global.tempStorage[state];
    if (!idPropietario) {
        return res.status(400).send("Propietario no encontrado");
    }

    // Eliminar el idPropietario del almacenamiento temporal
    delete global.tempStorage[state];

    // Intercambiar el código por tokens llamando a la API de Mercado Pago
    storeTokens(codigoAutorizacion, idPropietario, res)
        .then(() => res.send("¡Tokens guardados con éxito!"))
        .catch(error => res.status(500).send("Error al guardar los tokens"));
};






module.exports = {crearAcessToken,generarURLAutorizacion}