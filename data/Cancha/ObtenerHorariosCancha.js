const { connection } = require("../../config");
const moment = require('moment');

const ObtenerHorariosCancha = (req, res) => {
  const { idCancha } = req.body;

  const DatosHorarios = ` SELECT id_Horarios_Canchas, Hora_Cancha, Fecha_Cancha, Estado_Hora
    FROM horarios_canchas WHERE Cancha_id_Cancha = ${idCancha} AND Estado_Hora = "Disponible"`;

  connection.query(DatosHorarios, (err, response) => {
    if (err) return res.send(err);

    // Formatear las fechas
    const formattedResponse = response.map(item => ({
      ...item,
      Fecha_Cancha: moment(item.Fecha_Cancha).format('YYYY-MM-DD')
    }));

    res.send(formattedResponse);
  });
};

module.exports = { ObtenerHorariosCancha };
