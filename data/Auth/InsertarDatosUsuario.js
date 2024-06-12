const { connection } = require("../../config");
const axios = require("axios");
require("dotenv").config();
var bcrypt = require("bcryptjs");

const getAccessToken = async () => {
  const response = await axios.post(
    `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials",
    }
  );

  return response.data.access_token;
};

const InsertarUsuario = async (req, res) => {
  var {
    email,
    password,
    nombre,
    apellido,
    dni,
    telefono,
    rol,
    Foto_Perfil,
    Cuit,
    cuil,
    idPropietario
  } = req.body;

  console.log(req.body);

  const InsertarPersona ="INSERT INTO persona (Dni,Nombre,Apellido,Num_Telefono) VALUES (?,?,?,?)";
  const InsertarCuenta ="INSERT INTO cuenta (id_Sub,Email,Contraseña,Rol,Foto_Perfil,Persona_id_Persona) VALUES (?,?,?,?,?,?)";
  const InsertarLocatario ="INSERT INTO locatario (Cuenta_id_Cuenta) VALUES (?)";
  const InsertarPropietario ="INSERT INTO propietario (Cuit,Cuenta_id_Cuenta) VALUES (?,?)";
  const InsertarEmpleado = "INSERT INTO empleado (Cuil,Cuenta_id_Cuenta,Perfil_id_Perfil,propietario_id_Propietario) VALUES (?,?,?,?)";
  
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  if (Foto_Perfil) {
    const base64Data = Foto_Perfil.replace(/^data:image\/png;base64,/, "");
    var FotoPerfilBlob = Buffer.from(base64Data, "base64");
  }
  if (rol === "Propietario") {
    // Extraer los 8 dígitos del medio del CUIT
    dni = Cuit.substring(2, 10);
  }

  connection.query(
    InsertarPersona,
    [dni, nombre, apellido, telefono],
    async (err, response) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error al insertar persona");
      }

      const idPersona = response.insertId;

      const accessToken = await getAccessToken(); // Obtener nuevo token de acceso

      let data = JSON.stringify({
        email: email,
        user_metadata: {},
        blocked: false,
        email_verified: false,
        app_metadata: {},
        given_name: nombre,
        family_name: apellido,
        name: `${nombre} ${apellido}`,
        nickname: email,
        picture: `https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg`,
        connection: "CanchasDB-Users",
        password: password,
        verify_email: true,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      };

      try {
        const auth0Response = await axios.request(config); //Aca obtengo el userid_que me devuelve cuando creo al usuario
        console.log(JSON.stringify(auth0Response.data));
        const Sub = auth0Response.data.user_id;

        connection.query(
          InsertarCuenta,
          [Sub, email, hash, rol, FotoPerfilBlob, idPersona],
          (err, response) => {
            if (err) {
              console.log(err);
              return res.status(409).send("Error al insertar cuenta");
            }

            const idCuenta = response.insertId;

            if (rol === "Locatario") {
              connection.query(
                InsertarLocatario,
                [idCuenta],
                (err, response) => {
                  if (err) {
                    console.log(err);
                    return res.status(409).send("Error al insertar locatario");
                  }
                }
              );
            }

            if (rol === "Propietario") {
              connection.query(
                InsertarPropietario,
                [Cuit, idCuenta],
                (err, response) => {
                  if (err) {
                    console.log(err);
                    return res
                      .status(500)
                      .send("Error al insertar propietario");
                  }
                }
              );
            }

            if (rol === "Empleado"){
              connection.query( 
                InsertarEmpleado,
                [cuil,idCuenta,null,idPropietario],
                (err,response) => {
                  if(err){
                    console.log(err);
                    return res.status(409).send("Error al insertar Empleado");       
                  }
                }
              )
            }

            res.status(201).send("Usuario creado con éxito");
          }
        );
      } catch (error) {
        console.log(error.response.data);
        res
          .status(409)
          .send(error.response.data);
      }
    }
  );

};

module.exports = { InsertarUsuario };
