const axios = require('axios');
require('dotenv').config();

const headers = {
    Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
};

const crearPago = async (req, res) => {
    
    
    try {

        const idPayment = req.body.data.id;
        const response = await axios.get(`https://api.mercadopago.com/v1/payments/${idPayment}`, { headers });
        const status = response.data.status;
        const metadata = response.data.metadata;
        
        if (status === "approved") {
            const reservaResponse = await axios.post(`${process.env.MP_REDIRECT_URI}AddReserva`, {
                Hora_Reservada: metadata.hora_reservada,
                Fecha_Reservada: metadata.fecha_reservada,
                Total_Reservada: metadata.total_reservada,
                idCancha: metadata.id_cancha,
                idLocatario: metadata.id_locatario,
            });
            
            console.log('Reserva creada con éxito:', reservaResponse.data);
            res.status(200).send('Reserva creada con éxito');
        } else {
            console.log('El pago no fue aprobado, estado:', status);
            res.status(400).send('El pago no fue aprobado');
        }
    } catch (error) {
        res.status(500).send('Error al procesar el pago');
    }
};

module.exports = { crearPago };
