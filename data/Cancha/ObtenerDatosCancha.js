const { connection } = require("../../config");

const ObtenerDatosCancha = (req, res) => {
  
  
  const { idComplejo } = req.body;

  const DatosCancha = `SELECT 
  id_Cancha, Nombre_Cancha, Dimensiones, Especificaciones, Deporte,Estado_Cancha,Precio_Cancha,Imagen_Cancha 
  from cancha where Complejo_id_Complejo = ${idComplejo}`;

  connection.query(DatosCancha,(err,response) => {
    if(err) return res.send(err);
    res.send(response);
  })
};

module.exports = { ObtenerDatosCancha };
