const { connection } = require("../../config");
const { obtenerHoraRango } = require("../../functions/GenerarHoraRango");
const {obtenerFechasProximosDosMeses} = require("../../functions/ObtenerFechaPorDia");

const addDatosCancha = async (req, res) => {
  const {
    Nombre_Cancha,
    Dimensiones,
    Especificaciones,
    Deporte,
    Estado_Cancha,
    Precio_Cancha,
    Imagen_Cancha,
    idComplejo,
  } = req.body;
  
  const Estado_Hora = "Disponible";

  const insertDatosCancha = `INSERT INTO cancha 
    (Nombre_Cancha,Dimensiones,Especificaciones,Deporte,Estado_Cancha,Precio_Cancha,Imagen_Cancha,Complejo_id_Complejo) 
    VALUES (?,?,?,?,?,?,?,?)`;

  try {
    // Insertar la nueva cancha
    connection.query(
      insertDatosCancha,
      [
        Nombre_Cancha,
        Dimensiones,
        Especificaciones,
        Deporte,
        Estado_Cancha,
        Precio_Cancha,
        Imagen_Cancha,
        idComplejo,
      ],
      async (error, results) => {
        if (error) {
          res.send("Error al insertar la cancha");
          return;
        }

        const canchaId = results.insertId;

        const selectHorarios = `SELECT * FROM horarios_complejo WHERE Complejo_id_Complejo = ?`;

        connection.query(selectHorarios, [idComplejo], (error, horarios) => {
          if (error || horarios.length === 0) {
            res.send("Error al obtener los horarios del complejo");
            return;
          }

          const insertHorariosCancha = `INSERT INTO horarios_canchas (Hora_Cancha, Fecha_Cancha, Estado_Hora, Cancha_id_Cancha) VALUES (?,?,?,?)`;

          const horariosConHoras = horarios.map((horario) => ({
            ...horario,
            horas: obtenerHoraRango(horario.hora_Apertura, horario.hora_Cierre),
            fechas: obtenerFechasProximosDosMeses(horario.Dias_Semana_id_Dias_Semana),
          }));

          // Itera sobre cada horario y sus horas, y realiza las inserciones
          for (let horario of horariosConHoras) {
            for (let fecha of horario.fechas) {
              for (let hora of horario.horas) {
                connection.query(
                  insertHorariosCancha,
                  [hora, fecha, Estado_Hora, canchaId],
                  (err, result) => {
                    if (err) {
                      res.send(err);
                    }
                  }
                );
              }
            }
          }

          res.send("Horas insertadas correctamente");
        });
      }
    );
  } catch (err) {
    res.send("Error");
  }
};


const testAddHorarios = (req, res) => {
  res.send("TEST")
};


module.exports = { addDatosCancha, testAddHorarios };
