const { connection } = require("../../config");
const axios = require("axios");
require("dotenv").config();
var bcrypt = require('bcryptjs');


const getAccessToken = async () => {
  const response = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials",
    }
  );

  return response.data.access_token;
};


const InsertarUsuario = async (req, res) => {
  
  const { email, password, nombre, apellido, dni, telefono, rol,Foto_Perfil,Sub="",Cuit=""} = req.body;
 

  const InsertarPersona = "INSERT INTO persona (Dni,Nombre,Apellido,Num_Telefono) VALUES (?,?,?,?)"
  const InsertarCuenta = "INSERT INTO cuenta (id_Sub,Email,Contraseña,Rol,Foto_Perfil,Persona_id_Persona) VALUES (?,?,?,?)"
  const InsertarLocatario = "INSERT INTO locatario (Cuenta_id_Cuenta) VALUES (?)";
  const InsertarPropietario = "INSERT INTO propietario (Cuit,Cuenta_id_Cuenta) VALUES (?,?)";
  const InsertarEmpleado = "";

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  if(Foto_Perfil){
    // Eliminar el prefijo Base64
    const base64Data = LogoComplejo.replace(/^data:image\/png;base64,/, "");
    // Convertir la cadena Base64 a un buffer binario
    var FotoPerfilBlob = Buffer.from(base64Data, 'base64');
  }


  connection.query(InsertarPersona,[dni,nombre,apellido,telefono],(err,response) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error al insertar persona");
    }
    const idPersona = response.insertId;
    connection.query(InsertarCuenta,[Sub,email,hash,rol,FotoPerfilBlob,idPersona],(err,response) =>{
      if (err) {
        console.log(err);
        return res.status(500).send("Error al insertar cuenta");
      }
      const idCuenta = response.insertId;

      if(rol == "Locatario"){
        connection.query(InsertarLocatario,[idCuenta],(err,response) => {
          if(err){
            console.log(err);
            return res.status(500).send("Error al insertar Locatario");
          }
        })
      }
      if(rol == "Propietario"){
        connection.query(InsertarPropietario,[Cuit,idCuenta],(err,response) => {
          if(err){
            console.log(err);
            return res.status(500).send("Error al insertar Locatario");
          }
        })
      }
    })
  })

  const accessToken = await getAccessToken(); // Obtener nuevo token de acceso, caduca cada 24 horas

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
    picture: `https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg`, //utilizar directamente la base64
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
      Authorization: `Bearer ${accessToken}`, // Usar el nuevo token de acceso
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      res.status(201).send("Usuario Creado con Exito");
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .send(error.response ? error.response.data : error.message);
    });

};

module.exports = { InsertarUsuario };