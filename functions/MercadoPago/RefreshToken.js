const { default: axios } = require("axios");
const { connection } = require("../../config")



async function refreshAccessToken(idPropietario){
    

    const ConsultaRefreshToken = `select refreshToken, code, publicKey from cuenta_mercadopago where Propietario_id_Propietario = ${idPropietario}`

    return new Promise((resolve, reject) => {
        connection.query(ConsultaRefreshToken, async (err, response) => {
            if (err) {
                console.log(err);
                return reject(err);
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

            try {
                const axiosResponse = await axios.post('https://api.mercadopago.com/oauth/token', refreshTokenData);
                const newAccessToken = axiosResponse.data.access_token;
                resolve(newAccessToken);
            } catch (axiosError) {
                reject(axiosError);
            }
        });
    });
}


module.exports = {refreshAccessToken}