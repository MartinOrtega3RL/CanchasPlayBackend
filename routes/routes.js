const express = require("express");
const router = express.Router();
const { AñadirDatos } = require("../data/Complejo/AñadirDatosComplejo");
const {ModificarDatos,ModificarHorarioComplejo} = require("../data/Complejo/ModifcarDatosComplejo");
const { EliminarComplejo } = require("../data/Complejo/EliminarComplejo");
const {addDatosCancha,testAddHorarios,} = require("../data/Cancha/InsertarDatosCancha");
const {obtenerDatosComplejo, obtenerComplejos} = require("../data/Complejo/ObtenerDatosComplejo");
const { ObtenerDatosCancha, ObtenerImagenesCancha, ObtenerMisCanchas } = require("../data/Cancha/ObtenerDatosCancha");
const { ObtenerHorariosCancha,} = require("../data/Cancha/ObtenerHorariosCancha");
const { InsertarUsuario } = require("../data/Auth/InsertarDatosUsuario");
const { crearAcessToken } = require("../Api/MercadoPago/InsertarCuentaMp");
const { crearPreferencia } = require("../Api/MercadoPago/CrearPreferencia");
const { obtenerPubicKey } = require("../Api/MercadoPago/ObtenerPublicKey");
const { obtenerInfoReserva } = require("../data/Reserva/ObtenerInfoReserva");
const AñadirReserva = require("../data/Reserva/AñadirReserva");
const { obtenerDatosUsuario } = require("../data/Auth/ObtenerDatosUsuario");
const { insertarPerfil } = require("../data/Perfil/InsertarPerfil");
const { obtenerModulos } = require("../data/Modulos/ObtenerModulos");
const { obtenerPerfil } = require("../data/Perfil/ObtenerPerfil");
const { obtenerDatosEmpleado } = require("../data/Auth/ObtenerDatosEmpleado");

//MercadoPago//
router.get("/createAccessToken",crearAcessToken);
router.post("/createPreference",crearPreferencia);
router.post("/ObtenerPublicKey",obtenerPubicKey);

//Complejo
router.post("/AddDatosComplejo", AñadirDatos);
router.post("/ModDatosComplejo", ModificarDatos);
router.post("/ModHorariosComplejo", ModificarHorarioComplejo);
router.delete("/EliminarComplejo", EliminarComplejo);
router.get("/ObtenerDatosComplejo", obtenerDatosComplejo);
router.post("/ObtenerComplejo",obtenerComplejos);
//Cancha
router.post("/AddDatosCancha", addDatosCancha);
router.post("/ObtenerDatosCancha", ObtenerDatosCancha);
router.post("/ObtenerImagenesCancha",ObtenerImagenesCancha)
router.post("/ObtenerHorariosCancha", ObtenerHorariosCancha);
router.post("/ObtenerMisCanchas",ObtenerMisCanchas);
//
router.post("/testAddHorarios", testAddHorarios);
//Reserva
router.post("/AddReserva",AñadirReserva);
router.post("/ObtenerInfoReservas",obtenerInfoReserva);

//Usuario Auth0
router.post("/AddDatosUsuario", InsertarUsuario);
router.post("/ObtenerCuentaUser",obtenerDatosUsuario);
//--Horarios

//Perfiles
router.post("/AddPerfil",insertarPerfil);
router.post("/ObtenerPerfil",obtenerPerfil);

//Modulos
router.get("/ObtenerModulos",obtenerModulos);6

//Empleado

router.post("/ObtenerEmpleados",obtenerDatosEmpleado);

module.exports = router;
