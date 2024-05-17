const { connection } = require("../../config");

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

    const insertDatosCancha = `INSERT INTO cancha 
    (Nombre_Cancha,Dimensiones,Especificaciones,Deporte,Estado_Cancha,Precio_Cancha,Imagen_Cancha,Complejo_id_Complejo) 
    VALUES (?,?,?,?,?,?,?,?)`;
  
    try {
        // Insertar la nueva cancha
        connection.query(insertDatosCancha, [
          Nombre_Cancha,
          Dimensiones,
          Especificaciones,
          Deporte,
          Estado_Cancha,
          Precio_Cancha,
          Imagen_Cancha,
          idComplejo,
        ], async (error, results) => {
          if (error) {
            res.send("Error al insertar la cancha");
            return;
          }
    
          const canchaId = results.insertId;
    
          // Obtener horarios del complejo
          const selectHorarios = `SELECT * FROM horarios WHERE Complejo_id_Complejo = ?`;
          connection.query(selectHorarios, [idComplejo], (error, horarios) => {
            if (error || horarios.length === 0) {
              res.send("Error al obtener los horarios del complejo");
              return;
            }

            console.log(horarios)
            const insertHorariosCancha = `INSERT INTO horarios_canchas (Hora_Cancha, Fecha_Cancha, Estado_Hora, Cancha_id_Cancha) VALUES ?`;
            
            for (const horario of horarios ){
                // console.log(horario.hora_Apertura);
                // console.log(horario.hora_Cierre);
                // console.log(horario.Dias_Semana_id_Dias_Semana);
                for (let hora = horario.hora_Apertura; hora <= horario.hora_Cierre; hora++) {
                    console.log(hora)
                  }
            }
            
          });
        });
      } catch (err) {
        res.send("Error");
      }
  };

module.exports = { addDatosCancha };
