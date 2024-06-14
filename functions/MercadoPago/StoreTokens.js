const axios = require('axios');
const {connection} = require("../../config");
require('dotenv').config();




function storeTokens(codigoAutorizacion, idPropietario) {
    return new Promise((resolve, reject) => {

    const data = {
        client_secret: process.env.MP_CLIENT_SECRET,
        client_id: process.env.MP_CLIENT_ID,
        grant_type:'authorization_code',
        code: codigoAutorizacion,
        redirect_uri: `${process.env.MP_REDIRECT_URI}createAccessToken`,
    };
  
    axios.post('https://api.mercadopago.com/oauth/token', data)
      .then(response => {
        // Obtén los tokens de la respuesta de MercadoPago
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        const expiresIn = response.data.expires_in;
        const publicKey = response.data.public_key;
        const user_id = response.data.user_id;
        
        // Consulta SQL para insertar los datos en la tabla cuenta_mp
        const InsertarCuentaMp = 'INSERT INTO cuenta_mercadopago (user_id, accessToken, refreshToken,publicKey,code,Propietario_id_Propietario) VALUES (?,?, ?, ?, ?, ?)';
        const valoresCuentaMp = [user_id,accessToken, refreshToken, publicKey,codigoAutorizacion,idPropietario];
  
        connection.query(InsertarCuentaMp, valoresCuentaMp, (err, results) => {
            if (err) {
              console.error('Error al insertar datos en la base de datos:', err);
              reject(err);
            } else {
              // Resuelve la promesa con los datos insertados
              resolve({
                accessToken,
                refreshToken,
                publicKey,
                codigoAutorizacion,
              });
            }
          });
        })
        .catch(error => {
          console.error('Error al renovar el token de acceso:', error);
          reject(error);
        });
    })
  }



module.exports = {storeTokens}