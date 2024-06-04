const { connection } = require("../../config");
const { MercadoPagoConfig, Preference } = require('mercadopago');
const { refreshAccessToken } = require("../../functions/MercadoPago/RefreshToken");
require('dotenv').config();

const crearPreferencia = async (req, res) => {
    const idPropietario = 2;
    const AccessToken = await refreshAccessToken(idPropietario); // Asegúrate de que refreshAccessToken sea una función asincrónica y devuelva una promesa.

    const { Descripcion, Precio, Cantidad, Nombre, Apellido, Email, Num_Telefono, Dni } = req.body;
    
    try {
        const client = new MercadoPagoConfig({ accessToken: AccessToken, options: { timeout: 5000 } });
        const preference = new Preference(client);

        const body = {
            items: [
                {
                    title: Descripcion,
                    unit_price: Number(Precio),
                    quantity: Number(Cantidad),
                    currency_id: "ARS"
                }
            ],
            payer: {
                name: Nombre,
                surname: Apellido,
                email: Email,
                phone: {
                    area_code: "3704",
                    number: Num_Telefono
                },
                identification: {
                    type: "DNI",
                    number: Dni
                }
            },
            back_urls: {
                success: process.env.MP_BACK_URLS,
                failure: process.env.MP_BACK_URLS,
                pending: ""
            },
            auto_return: "approved",
            notification_url: process.env.MP_REDIRECT_URI,
            payment_methods: {
                excluded_payment_methods: [],
                excluded_payment_types: [
                    {
                        id: "ticket"
                    },
                    {
                        id: "credit_card"
                    }
                ],
                installments: 3
            }
        };

        preference.create({ body: body})
            .then(response => {
                res.json({
                    id: response.id,
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).send("Ocurrió un error al crear la preferencia.");
            });

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error con su solicitud :(");
    }
};

module.exports = { crearPreferencia };
