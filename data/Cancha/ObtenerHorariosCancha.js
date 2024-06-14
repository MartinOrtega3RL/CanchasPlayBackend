const { connection } = require("../../config");
const moment = require('moment');

const ObtenerHorariosCancha = (req, res) => {

  const { idComplejo } = req.body;

  const DatosHorarios = `
    SELECT id_Horarios_Canchas, Hora_Cancha, Fecha_Cancha, Estado_Hora, id_Cancha, Nombre_Cancha, Especificaciones,Deporte,Precio_Cancha
    FROM horarios_canchas hc
    JOIN cancha ca ON hc.Cancha_id_Cancha = ca.id_Cancha
    JOIN complejo cm on ca.Complejo_id_Complejo = cm.id_Complejo
    WHERE ca.Complejo_id_Complejo = ${idComplejo} AND Estado_Hora = "Disponible"
  `;

  connection.query(DatosHorarios, (err, response) => {
    if (err) return res.send(err);

    // Formatear las fechas y estructurar los datos
    const formattedResponse = response.reduce((acc, item) => {
      // Formatear la fecha
      const formattedFecha = moment(item.Fecha_Cancha).format('YYYY-MM-DD');

      // Buscar si ya existe una entrada para esta cancha
      let cancha = acc.find(c => c.key === item.id_Cancha);

      if (!cancha) {
        // Si no existe, crear una nueva entrada
        cancha = {
          key: item.id_Cancha,
          cancha: item.Nombre_Cancha,
          caracteristicas: item.Especificaciones,
          deporte: item.Deporte,
          precio: item.Precio_Cancha,
          horarios: []
        };
        acc.push(cancha);
      }

      // Añadir el horario a la cancha
      cancha.horarios.push({
        date: formattedFecha,
        time: item.Hora_Cancha
      });

      return acc;
    }, []);

    res.send(formattedResponse);
  });
};

module.exports = { ObtenerHorariosCancha };
