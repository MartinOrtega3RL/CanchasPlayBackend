const connection = require("../../config");

const ModificarDatos = (req, res) => {
  const { idComplejo, NombreComplejo, Ubicacion, LogoComplejo } = req.body;

  // Consulta para actualizar la tabla 'complejo'
  const ModificarComplejo = `UPDATE complejo SET Nombre_Complejo = ?, Ubicacion = ?, Logo_Complejo = ? WHERE id_Complejo = ?`;

  connection.query(
    ModificarComplejo,
    [NombreComplejo, Ubicacion, LogoComplejo ? LogoComplejo : null, idComplejo],
    (err, response) => {
      if (err) return res.send(err);
      res.send(response);
      if (err) {
        console.log(err);
        return res.status(500).send("Error al guardar el complejo deportivo");
      }
    }
  );
};


const ModificarHorarioComplejo = (req, res) => {
    const { HoraApertura, idComplejo } = req.body;
  
    // Consulta para eliminar los horarios existentes del complejo
    const EliminarHorarios = `DELETE FROM horarios WHERE Complejo_id_Complejo = ${idComplejo}`;
    // Consulta para insertar los nuevos horarios
    const InsertarHorario = `INSERT INTO horarios (hora_apertura, hora_cierre, Complejo_id_Complejo, Dias_Semana_id_Dias_Semana) VALUES (?, ?, ?, ?)`;
  
    const diasSemanaMap = {
      Lunes: 1,
      Martes: 2,
      Miércoles: 3,
      Jueves: 4,
      Viernes: 5,
      Sábado: 6,
      Domingo: 7,
    };
  
    connection.query(EliminarHorarios, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error al eliminar los horarios existentes");
      }
  
      const horarioPromises = [];
  
      for (const [dia, horas] of Object.entries(HoraApertura)) {
        const diaSemanaId = diasSemanaMap[dia];
  
        for (const [_, horasArray] of Object.entries(horas)) {
          const [horaApertura, horaCierre] = horasArray;
          const horarioPromise = new Promise((resolve, reject) => {
            connection.query(
              InsertarHorario,
              [horaApertura, horaCierre, idComplejo, diaSemanaId],
              (err) => {
                if (err) {
                  return reject(err);
                }
                resolve();
              }
            );
          });
          horarioPromises.push(horarioPromise);
        }
      }
  
      Promise.all(horarioPromises)
        .then(() => {
          res.send("Datos actualizados correctamente");
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Error al actualizar los horarios");
        });
    });
  };

module.exports = { ModificarDatos, ModificarHorarioComplejo };
