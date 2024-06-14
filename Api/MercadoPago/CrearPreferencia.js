const { connection } = require("../../config");
const { MercadoPagoConfig, Preference } = require('mercadopago');
const { refreshAccessToken } = require("../../functions/MercadoPago/RefreshToken");
const { getIdPropietario } = require("../../functions/ObteneridPropietario");
require('dotenv').config();


const crearPreferencia = async (req, res) => {
    const { Descripcion, Precio, Cantidad, Nombre, Apellido, Email, Num_Telefono, Dni, idComplejo,Hora_Reservada,Fecha_Reservada,idCancha,idLocatario} = req.body;

    try {
        // Obtener idPropietario
        const idPropietario = await getIdPropietario(idComplejo);
        
        // Obtener AccessToken
        const AccessToken = await refreshAccessToken(idPropietario);

        // Configurar MercadoPago y preferencia
        const client = new MercadoPagoConfig({ accessToken: AccessToken, options: { timeout: 5000 } });
        const preference = new Preference(client);
        const body = {
            items: [
                {
                    title: Descripcion,
                    unit_price: Number(Precio),/*  */
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
                success: `${process.env.MP_BACK_URLS}dashboardLocatario`,
                failure: `${process.env.MP_BACK_URLS}dashboardLocatario`,
                pending: ""
            },
            auto_return: "approved",
            notification_url: `${process.env.MP_REDIRECT_URI}NotificacionPago`,
            metadata: {
                Hora_Reservada: Hora_Reservada,
                Fecha_Reservada: Fecha_Reservada,
                Total_Reservada: Precio,
                idCancha: idCancha,
                idLocatario: idLocatario
            },
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

        const response = await preference.create({ body });
        res.json({ id: response.id });
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error con su solicitud :(");
    }
};

module.exports = { crearPreferencia };