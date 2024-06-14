const { connection } = require("../../config");
const cron = require('node-cron');

// Función para actualizar el estado de las reservas
const actualizarEstadoReservas = () => {
    const queryObtenerReservas = "SELECT * FROM reserva WHERE Estado_Reserva = 'Activa'";

    connection.query(queryObtenerReservas, (err, reservas) => {
        if (err) {
            console.log(err);
            return;
        }

        const ahora = new Date();

        reservas.forEach(reserva => {
            const fechaReservada = new Date(reserva.Fecha_Reservada);
            const [hora, minutos, segundos] = reserva.Hora_Reservada.split(':');
            fechaReservada.setHours(hora, minutos, segundos);

            const unaHoraDespues = new Date(fechaReservada.getTime() + (60 * 60 * 1000)); // Añadir una hora

            if (ahora >= unaHoraDespues) {
                const queryActualizarReserva = "UPDATE reserva SET Estado_Reserva = 'Terminada' WHERE id_Reserva = ?";
                connection.query(queryActualizarReserva, [reserva.id_Reserva], (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(`Reserva con id ${reserva.id_Reserva} actualizada a Terminada`);
                });
            }
        });
    });
};

// Programar la tarea para que se ejecute cada minuto
cron.schedule('* * * * *', () => {
    actualizarEstadoReservas();
});
