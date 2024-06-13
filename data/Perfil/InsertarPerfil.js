const { connection } = require("../../config");

const crearPerfil = (req, res) => {
    const { Nombre_Perfil, Descripcion_Perfil, Modulos_Permisos_Asignados,idPropietario } = req.body;
    // Insertar el perfil en la tabla perfil
    const crearPerfilQuery = "INSERT INTO perfil (Nombre_Perfil, Descripcion_Perfil,propietario_id_Propietario) VALUES (?, ? ,?)";
    connection.query(crearPerfilQuery, [Nombre_Perfil, Descripcion_Perfil,idPropietario], (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error al insertar el perfil" });
        }

        // Obtener el ID del perfil recién insertado
        const idPerfil = response.insertId;

        // Obtener los mapeos de nombres de módulos y permisos a IDs
        const moduloIDMap = {};
        const permisoIDMap = {};

        // Consulta para obtener los mapeos de nombres de módulos a IDs
        const obtenerModulosQuery = "SELECT id_Modulo, Nombre_Modulo FROM modulos";
        connection.query(obtenerModulosQuery, (err, resultadosModulos) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Error al obtener los módulos" });
            }

            resultadosModulos.forEach(modulo => {
                moduloIDMap[modulo.Nombre_Modulo] = modulo.id_Modulo;
            });

            // Consulta para obtener los mapeos de nombres de permisos a IDs
            const obtenerPermisosQuery = "SELECT id_Permiso, Nombre_Permiso FROM permisos";
            connection.query(obtenerPermisosQuery, (err, resultadosPermisos) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Error al obtener los permisos" });
                }

                resultadosPermisos.forEach(permiso => {
                    permisoIDMap[permiso.Nombre_Permiso] = permiso.id_Permiso;
                });

                // Insertar las relaciones en la tabla modulos_has_perfiles
                for (const modulo in Modulos_Permisos_Asignados) {
                    const moduloID = moduloIDMap[modulo];
                    const permisos = Modulos_Permisos_Asignados[modulo];
                    const permisosIDs = permisos.map(permiso => permisoIDMap[permiso]);

                    permisosIDs.forEach(permisoID => {
                        const insertarModuloPerfilQuery = "INSERT INTO perfil_has_modulos (Perfil_id_Perfil, Modulos_id_Modulo, Permisos_id_Permiso) VALUES (?, ?, ?)";
                        connection.query(insertarModuloPerfilQuery, [idPerfil, moduloID, permisoID], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).json({ error: "Error al insertar los permisos asignados" });
                            }
                        });
                    });
                }

                return res.status(200).json({ message: "Perfil insertado correctamente" });
            });
        });
    });
};

const insertarPerfil = (req, res) => {
    const { idPerfil, idEmpleado } = req.body;

    // Crear las consultas de inserción
    const values = idPerfil.map(perfilId => [perfilId, idEmpleado]);
    const query = 'INSERT INTO perfil_has_empleado (Perfil_id_Perfil, Empleado_id_Empleado) VALUES ?';
    
    // Ejecutar la consulta de inserción
    connection.query(query, [values], (err, result) => {
        if (err) {
            console.error('Error al insertar los datos:', err);
            return res.status(500).send('Error del servidor');
        }

        res.send("Insertado con éxito");
    });
};

module.exports = { crearPerfil,insertarPerfil };
