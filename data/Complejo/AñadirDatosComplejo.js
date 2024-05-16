const connection = require("../../config");

const AñadirDatos = (req, res) => {
  //Datos que hay que añadir
  //Nombre,Hora_Apertura(10hs - 18hs - 21hs - 00hs),Fecha_Apertura(Lunes A sabados, Domingo-MedioDia)
  //Ubicacion,Estado_Complejo(Cerrado,Abierto),Logo_Complejo
  //fk_Propietario_id_Propietario, fk_Perfil_id_Perfil

  const {
    Nombre_Complejo,
    HoraApertura,
    Ubicacion,
    EstadoComplejo,
    LogoComplejo,
    idPropietario,
    idPerfil,
  } = req.body;

  console.log(HoraApertura);

  const InsertarComplejo =
    "INSERT INTO complejo (Nombre_Complejo,Ubicacion,Estado_Complejo,Propietario_id_Propietario,Perfil_id_Perfil) Values (?,?,?,?,?)";
  const InsertarHorario =
    "INSERT INTO Horarios (hora_Apertura, hora_Cierre,Complejo_id_Complejo,Dias_Semana_id_Dias_Semana) Values (?,?,?,?)";

  connection.query(
    InsertarComplejo,
    [Nombre_Complejo, Ubicacion, "Disponible", idPropietario, idPerfil],
    (err, response) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error al guardar el complejo deportivo");
      }

      const complejoId = response.insertId;

      const diasSemanaMap = {
        Lunes: 1,
        Martes: 2,
        Miércoles: 3,
        Jueves: 4,
        Viernes: 5,
        Sábado: 6,
        Domingo: 7,
      };

      const horarioPromises = [];

      for (const [dia, horas] of Object.entries(HoraApertura)) {
        const diaSemanaId = diasSemanaMap[dia];

        for (const [_, horasArray] of Object.entries(horas)) {
          const [horaApertura, horaCierre] = horasArray;
          const horarioPromise = new Promise((resolve, reject) => {
            connection.query(
              InsertarHorario,
              [horaApertura, horaCierre, complejoId, diaSemanaId],
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
          res.send("Datos Guardados");
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Error al guardar los horarios");
        });
    }
  );
};

module.exports = { AñadirDatos };
