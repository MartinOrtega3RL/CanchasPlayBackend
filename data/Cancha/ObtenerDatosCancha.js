const { connection } = require("../../config");


const ObtenerDatosCancha = (req, res) => {

  const { idComplejo } = req.body;

  const DatosCancha = `SELECT 
  id_Cancha, Nombre_Cancha, Dimensiones, Especificaciones, Deporte,Estado_Cancha,Precio_Cancha 
  from cancha where Complejo_id_Complejo = ${idComplejo}`;

  connection.query(DatosCancha,(err,response) => {
    if(err){
      console.log(err);
    }
    res.send(response)
  })
};

const ObtenerImagenesCancha = (req, res) => {
  const { idComplejo } = req.body;

  const ImagenesCancha = `
    SELECT Nombre_Imagen, Imagen 
    FROM imagenes_cancha ic
    JOIN cancha ca ON ic.Cancha_id_Cancha = ca.id_Cancha
    WHERE ca.Complejo_id_Complejo = ${idComplejo}`;

  connection.query(ImagenesCancha, (err, response) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener las imágenes de la cancha");
      return;
    }

    // Convertir las imágenes BLOB a Base64
    const imagenesBase64 = response.map(row => {
      const imagenBase64 = row.Imagen ? `data:image/png;base64,${row.Imagen.toString('base64')}` : null;
      return {
        Nombre_Imagen: row.Nombre_Imagen,
        Imagen: imagenBase64
      };
    });

    res.json(imagenesBase64);
  });
}


const ObtenerMisCanchas = (req,res) => {

  const {idPropietario} = req.body;

  const ConsultaMisCanchas = `select Nombre_Cancha, Dimensiones, Especificaciones, Deporte, Precio_Cancha,Nombre_Complejo from cancha ch
  join complejo cm on ch.Complejo_id_Complejo = cm.id_Complejo
  where Propietario_id_Propietario = ${idPropietario}`

  connection.query(ConsultaMisCanchas,(err,response) => {
    if(err){
      console.log(err);
      return;
    }
    res.send(response);
  })
}


module.exports = { ObtenerDatosCancha,ObtenerImagenesCancha,ObtenerMisCanchas};
