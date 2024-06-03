const { connection } = require("../../config");
const mercadopago = require("mercadopago");
const { refreshAccessToken } = require("../../functions/MercadoPago/RefreshToken");
require('dotenv').config();




const crearPreferencia = (req,res) =>{
    //Obtener la idPropietario -> buscando por idComplejo, a que prop esta asociado?
    const idPropietario = 1;
    // const {idHorario,idCancha,Hora,Fecha,price,email} = req.body
    const {Descripcion,Precio,Cantidad,Nombre,Apellido,Email,Num_Telefono,Dni} = req.body

    const AccessToken = refreshAccessToken(idPropietario);

    try {
        mercadopago.configure({access_token: AccessToken});

        let preference = {
              items: [
                {
                  title: req.body.Descripcion,
                  unit_price: Number(req.body.Precio),
                  quantity: Number(req.body.Cantidad),
                  
                },
              ],
              ppayer: {
                name: req.body.Nombre,
                surname: req.body.Apellido,
                email: req.body.Email,
                phone: {
                    area_code: "3704",
                    number: req.body.Num_Telefono
                },
                identification: {
                    type: "DNI",
                    number: req.body.Dni
                },
          
              },
              back_urls: {
                success: `${process.env.MP_BACK_URLS}`,
                failure: `${process.env.MP_BACK_URLS}`,
                pending: "",
              },
              binary_mode: true,
              auto_return: "approved",
              notification_url: `${process.env.MP_REDIRECT_URI}`,
              metadata: {},
              payment_methods: {
                excluded_payment_types: [
                  {
                    id: "ticket"
                  }
                ],
                installments: 3
              }
            };
            
            mercadopago.preferences
              .create(preference)
              .then(function (response) {
                res.json({
                  id: response.body.id,
                });
              })
              .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        res.send("Ocurrio un error con su solicitud :(")
    }



}



module.exports = {crearPreferencia}