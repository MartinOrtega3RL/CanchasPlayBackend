const { connection } = require("../../config");

const obtenerPermisos = (req, res) => {
  const { idEmpleado } = req.body;

  const sp_Obtener_Permisos_Empleado = "CALL SP_Obtener_Permisos_Empleado(?)";

  try {
    connection.query(
      sp_Obtener_Permisos_Empleado,
      [idEmpleado],
      (err, response) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error al obtener los permisos");
        }

        const permisos = response[0];

        // Transformar los permisos en el formato deseado
        const modulosPermisos = permisos.reduce((acc, permiso) => {
          const { Nombre_Modulo, Nombre_Permiso } = permiso;

          if (!acc[Nombre_Modulo]) {
            acc[Nombre_Modulo] = [];
          }

          acc[Nombre_Modulo].push(Nombre_Permiso);

          return acc;
        }, {});

        // Construir la respuesta final
        const respuesta = {
          id_Permiso: permisos[0].id_Permiso,
          id_Modulo: permisos[0].id_Modulo,
          id_Perfil: permisos[0].id_Perfil,
          Nombre_Perfil: permisos[0].Nombre_Perfil,
          modulosPermisos,
        };

        res.send(respuesta);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { obtenerPermisos };
