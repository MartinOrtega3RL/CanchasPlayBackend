const { connection } = require("../../config");
const { MercadoPagoConfig, Payment } = require('mercadopago');
const { refreshAccessToken } = require("../../functions/MercadoPago/RefreshToken");
require('dotenv').config();

const crearPreferencia = async (req, res) => {
    // Obtener la idPropietario -> buscando por idComplejo, a que prop esta asociado?
    const idPropietario = 2;
    const AccessToken = refreshAccessToken(idPropietario); // Asegúrate de que refreshAccessToken sea una función asincrónica y devuelva una promesa.

    const { Descripcion, Precio, Cantidad, Nombre, Apellido, Email, Num_Telefono, Dni } = req.body;

    try {
        // Step 2: Initialize the client object
        const client = new MercadoPagoConfig({ accessToken: AccessToken, options: { timeout: 5000 } });

        // Step 3: Initialize the API object
        const payment = new Payment(client);

        // Step 4: Create the request object
        const body = {
            items: [
                {
                    title: Descripcion,
                    unit_price: Number(Precio),
                    quantity: Number(Cantidad),
                },
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
                },
            },
            back_urls: {
                success: process.env.MP_BACK_URLS,
                failure: process.env.MP_BACK_URLS,
                pending: "",
            },
            binary_mode: true,
            auto_return: "approved",
            notification_url: process.env.MP_REDIRECT_URI,
            metadata: {},
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

        // // Step 5: Create request options object - Optional
        // const requestOptions = {
        //     idempotencyKey: '<IDEMPOTENCY_KEY>',
        // };

        // Step 6: Make the request
        payment.create({ body})
            .then(response => {
                res.json({
                    id: response.body.id,
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
