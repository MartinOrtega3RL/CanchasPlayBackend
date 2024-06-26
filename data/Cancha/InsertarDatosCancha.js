const { connection } = require("../../config");
const { obtenerHoraRango } = require("../../functions/GenerarHoraRango");
const {obtenerFechasProximosDosMeses} = require("../../functions/ObtenerFechaPorDia");

const addDatosCancha = async (req, res) => {
  const {
    Nombre_Cancha,
    Dimensiones,
    Especificaciones,
    Deporte,
    Estado_Cancha = "Disponible",
    Precio_Cancha,
    Imagen_Cancha,
    idComplejo,
  } = req.body;
  
  
  const Estado_Hora = "Disponible";

  const insertDatosCancha = `INSERT INTO cancha 
    (Nombre_Cancha,Dimensiones,Especificaciones,Deporte,Estado_Cancha,Precio_Cancha,Complejo_id_Complejo) 
    VALUES (?,?,?,?,?,?,?)`;

  const insertarImagenesCancha = `INSERT INTO imagenes_cancha (Nombre_Imagen,Imagen,Cancha_id_Cancha) VALUES (?,?,?)`
    
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
        idComplejo,
      ],
      async (error, results) => {
        if (error) {
          res.send("Error al insertar la cancha");
          return;
        }
        const canchaId = results.insertId;

        //Query de imagenes//
        // Insertar las imágenes de la cancha

        // if (Imagen_Cancha) {
        //   for (let key in Imagen_Cancha) {
        //     if (Imagen_Cancha.hasOwnProperty(key)) {
        //       const imagenBase64 = Imagen_Cancha[key];
        //       const base64Data = imagenBase64.replace(/^data:image\/\w+;base64,/, ""); // Eliminar el prefijo Base64
        //       const binaryData = Buffer.from(base64Data, 'base64'); // Convertir a binario

        //       connection.query(insertarImagenesCancha, [key, binaryData, canchaId], (error, results) => {
        //         if (error) {
        //           console.error("Error al insertar imagen:", error);
        //           res.send("Error al insertar imagenes de la cancha");
        //           return;
        //         }
        //       });
        //     }
        //   }
        // }
        ///


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
                    if(err){
                      console.log(err);
                    }
                  }
                );
              }
            }
          }

          res.send("Cancha Agregada con Exito!");
        });
      }
    );
  } catch (err) {
    res.send("Error");
    console.log("InsertCancha" + err)

  }
};


const testAddHorarios = (req, res) => {
  var {
    Cuit,
    Rol,
    dni = 12,
    
  } = req.body;

    if(Rol == "Propietario"){

      dni = Cuit.substring(2, 10);
    }
  
    console.log(dni)
};


module.exports = { addDatosCancha, testAddHorarios };
