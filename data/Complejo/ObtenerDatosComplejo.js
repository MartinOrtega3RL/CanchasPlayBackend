const { connection } = require("../../config");

const obtenerDatosComplejo = (req, res) => {
    
  const DatosComplejo = "SELECT id_Complejo, Nombre_Complejo, Ubicacion, Logo_Complejo FROM complejo";

  connection.query(DatosComplejo, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error al obtener los datos de los complejos");
    }

    // Convertir cada logo a una cadena Base64
    const complejos = results.map(complejo => {
      const logoBase64 = complejo.Logo_Complejo ? complejo.Logo_Complejo.toString('base64') : null;
      return {
        id_Complejo: complejo.id_Complejo,
        Nombre_Complejo: complejo.Nombre_Complejo,
        Ubicacion: complejo.Ubicacion,
        Logo_Complejo: logoBase64 ? `data:image/png;base64,${logoBase64}` : null
      };
    });

    res.send(complejos);
  });
};


const obtenerComplejos = (req,res) => {

  const {idPropietario = 2} = req.body

  const ConsultaComplejo = `select Nombre_Complejo,id_Complejo from complejo where Propietario_id_Propietario = ${idPropietario}`

  connection.query(ConsultaComplejo,(err,response)=> {
    if(err){
      console.log(err);
    }
    res.send(response.data)
  })
}

module.exports = { obtenerDatosComplejo,obtenerComplejos};
