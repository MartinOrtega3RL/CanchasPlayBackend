const { connection } = require("../../config");

 
const InsertarUsuario = (req,res) => {

  const {email,password, userMetadata } = req.body;
  

  console.log(req.body);

  const InsertarPersona = "INSERT INTO persona (Dni,Nombre,Apellido,Num_Telefono) VALUES (?, ?, ?, ?)";
  const InsertarCuenta = "INSERT INTO cuenta (Email,Contraseña,Rol) VALUES (?, ?, ?)";
  const InsertarLocatario = "INSERT INTO locatario (Cuenta_id_Cuenta) VALUES (?)";
  const InsertarPropietario = "INSERT INTO  propietario  (Cuit,Cuenta_id_Cuenta) VALUES (?, ?)";




}


module.exports = {InsertarUsuario};