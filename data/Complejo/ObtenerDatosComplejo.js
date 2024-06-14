const { connection } = require("../../config");

const obtenerDatosComplejo = (req, res) => {
  const DatosComplejo = `
    SELECT 
      id_Complejo, 
      Nombre_Complejo, 
      Ubicacion, 
      Logo_Complejo, 
      Foto_Perfil 
    FROM complejo cm
    JOIN propietario pr ON cm.Propietario_id_Propietario = pr.id_Propietario
    JOIN cuenta ct ON pr.Cuenta_id_Cuenta = ct.id_Cuenta`;

  connection.query(DatosComplejo, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error al obtener los datos de los complejos");
    }

    // Convertir cada logo y foto de perfil a una cadena Base64
    const complejos = results.map(complejo => {
      const logoBase64 = complejo.Logo_Complejo ? complejo.Logo_Complejo.toString('base64') : null;
      const fotoBase64 = complejo.Foto_Perfil ? complejo.Foto_Perfil.toString('base64') : null;
      
      return {
        id_Complejo: complejo.id_Complejo,
        Nombre_Complejo: complejo.Nombre_Complejo,
        Ubicacion: complejo.Ubicacion,
        Logo_Complejo: logoBase64 ? `data:image/png;base64,${logoBase64}` : null,
        Foto_Perfil: fotoBase64 ? `data:image/png;base64,${fotoBase64}` : null
      };
    });

    res.send(complejos);
  });
};

const obtenerComplejos = (req,res) => {

  const {idPropietario} = req.body

  const ConsultaComplejo = `select Nombre_Complejo,id_Complejo from complejo where Propietario_id_Propietario = ${idPropietario}`

  connection.query(ConsultaComplejo,(err,response)=> {
    if(err){
      console.log(err);
    }
    res.send(response)
  })
}

module.exports = { obtenerDatosComplejo,obtenerComplejos};
