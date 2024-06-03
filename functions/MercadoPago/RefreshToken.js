const { default: axios } = require("axios");
const { connection } = require("../../config")



function refreshAccessToken(idPropietario){

    const ConsultaRefreshToken = `select refreshToken, code, publicKey from cuenta_mercadopago where Propietario_id_Propietario = ${idPropietario}`

    connection.query(ConsultaRefreshToken,(err,response) => {
        if(err){
            console.log(err);
        }
        const refreshToken = response[0].refreshToken; // Asumiendo que recuperas el valor correctamente
        const code = response[0].code; // Recupera el código de autorización


        const refreshTokenData = {
            client_secret: process.env.MP_CLIENT_SECRET,
            client_id: process.env.MP_CLIENT_ID,
            code: code,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        };


        axios.post('https://api.mercadopago.com/oauth/token', refreshTokenData)
        .then(response =>{
            const newAccessToken = response.data.access_token;
            return newAccessToken;
        })
        .catch(err => {
            console.log(err);
        })
    })    
}


module.exports = {refreshAccessToken}