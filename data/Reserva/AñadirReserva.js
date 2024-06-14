const { connection } = require("../../config");
const { guardarDetalleReserva } = require("../../functions/Reserva/GuardarDetalleReserva");

const AñadirReserva = (req, res) => {
  const {
    Hora_Reservada,
    Fecha_Reservada,
    Total_Reservada,
    Estado_Reserva = "Activa",
    idCancha,
    idPersona=null,
    idLocatario = null,
    idPropietario = null,
    idPerfil = null,
  } = req.body;


  const ConsultaIdComplejo = `select Complejo_id_Complejo from cancha where id_Cancha = ${idCancha}`;
  const InsertarDatosReserva ="INSERT INTO reserva (Hora_Reservada,Fecha_Reservada,Total_Reserva,Estado_Reserva,Complejo_id_Complejo) VALUES (?,?,?,?,?)";
  const InsertarUsuarioResponsable ="UPDATE reserva SET Propietario_id_Propietario = ?, Locatario_id_Locatario = ?, Perfil_id_Perfil = ? where id_Reserva = ?";
  const sp_Cambiar_Estado_Cancha = "CALL SP_Cambiar_Estado_Cancha(?, ?, ?)";

  try {
    
  
  connection.query(ConsultaIdComplejo, (err, response) => {
    if (err) {
      console.log(err);
      return;
    }
    const idComplejo = response[0].Complejo_id_Complejo;
    connection.query(
      InsertarDatosReserva,
      [
        Hora_Reservada,
        Fecha_Reservada,
        Total_Reservada,
        Estado_Reserva,
        idComplejo,
      ],
      (err, response) => {
        if (err) {
          console.log(err);
          return;
        }
        const idReserva = response.insertId;

        connection.query(
          InsertarUsuarioResponsable,
          [idPropietario, idLocatario, idPerfil, idReserva],
          (err, response) => {
            if (err) {
              console.log(err);
              return;
            }
          }
        );
        connection.query(
          sp_Cambiar_Estado_Cancha,
          [Hora_Reservada, Fecha_Reservada, idCancha],
          (err, response) => {
            if (err) {
              console.log(err);
              return;
            }
          }
        );
        guardarDetalleReserva(idReserva,idPersona,Total_Reservada)
        res.send("Reserva agregada con Exito");
      }
    );
  });
  } catch (error) {
    console.log("Error" + error);  
  }
};

module.exports = AñadirReserva;
