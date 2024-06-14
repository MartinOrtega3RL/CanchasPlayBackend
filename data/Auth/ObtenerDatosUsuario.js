const { connection } = require("../../config");

const obtenerDatosUsuario = (req, res) => {
    const { id_Sub } = req.body;

    const sp_ConsultaCuentaUsuario = "CALL SP_Obtener_Cuenta_Usuario(?)";
    const ConsultaIdPropietario = "SELECT Propietario_id_Propietario FROM empleado WHERE id_Empleado = ?";

    try {
        connection.query(sp_ConsultaCuentaUsuario, [id_Sub], (err, response) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al obtener la cuenta del usuario");
            }
            const usuario = response[0][0];
            
            if (usuario && usuario.id_Empleado) {
                connection.query(ConsultaIdPropietario, [usuario.id_Empleado], (err, response) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("Error al obtener el id del propietario");
                    }

                    const propietario = response[0] ? response[0].Propietario_id_Propietario : null;
                    if (propietario) {
                        usuario.id_Propietario = propietario;
                    }

                    // Convertir la foto de perfil a una cadena Base64
                    if (usuario.Foto_Perfil) {
                        usuario.Foto_Perfil = `data:image/png;base64,${usuario.Foto_Perfil.toString('base64')}`;
                    }

                    res.send(usuario);
                });
            } else {
                if (usuario && usuario.Foto_Perfil) {
                    usuario.Foto_Perfil = `data:image/png;base64,${usuario.Foto_Perfil.toString('base64')}`;
                }
                res.send(usuario);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error interno del servidor");
    }
};

module.exports = { obtenerDatosUsuario };
