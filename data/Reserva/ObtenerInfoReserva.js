const { connection } = require("../../config");



const obtenerInfoReserva = async (req, res) => {

    const { idPropietario } = req.body;

    const sp_ObtenerDatosReserva = "CALL SP_Obtener_Datos_Reserva(?)";

    connection.query(sp_ObtenerDatosReserva, [idPropietario], (err, response) => {
        if (err) {
            console.log(err);
            return;
        }

        // Procesar los datos para transformar la fecha
        const processedResponse = response[0].map(reserva => {
            let fechaReservada = reserva.Fecha_Reservada;

            // Convertir la fecha a cadena ISO y extraer solo la parte de la fecha
            if (fechaReservada instanceof Date) {
                fechaReservada = fechaReservada.toISOString().split('T')[0];
            }

            return {
                ...reserva,
                Fecha_Reservada: fechaReservada
            };
        });

        res.send(processedResponse);
    });
};


const obtenerMisReservas = (req, res) => {
    const { idLocatario } = req.body;

    const sp_ObtenerMisReservas = "CALL SP_Obtener_Mis_Reservas(?)";

    connection.query(sp_ObtenerMisReservas, [idLocatario], (err, response) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error en la consulta");
            return;
        }

        // Procesar los datos para transformar la fecha y estructurar la respuesta
        const processedResponse = response[0].map(reserva => {
            let fechaReservada = reserva.Fecha_Reservada;

            // Convertir la fecha a cadena ISO y extraer solo la parte de la fecha
            if (fechaReservada instanceof Date) {
                fechaReservada = fechaReservada.toISOString().split('T')[0];
            }

            return {
                key: reserva.id_Reserva.toString(), // Convertimos el id_Reserva a string para el key
                nombre: reserva.Nombre_Complejo,
                horario: reserva.Hora_Reservada,
                fecha: fechaReservada,
                direccion: reserva.Ubicacion,
                estado: [reserva.Estado_Reserva],
                monto: `$${reserva.Total_Reserva}`
            };
        });

        res.send(processedResponse);
    });
}

module.exports = { obtenerMisReservas };


module.exports = { obtenerInfoReserva,obtenerMisReservas };


