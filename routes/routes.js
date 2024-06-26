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
const { crearAcessToken, generarURLAutorizacion } = require("../Api/MercadoPago/InsertarCuentaMp");
const { crearPreferencia } = require("../Api/MercadoPago/CrearPreferencia");
const { obtenerPublicKey } = require("../Api/MercadoPago/ObtenerPublicKey");
const { obtenerInfoReserva, obtenerMisReservas } = require("../data/Reserva/ObtenerInfoReserva");
const AñadirReserva = require("../data/Reserva/AñadirReserva");
const { obtenerDatosUsuario } = require("../data/Auth/ObtenerDatosUsuario");
const { insertarPerfil, crearPerfil } = require("../data/Perfil/InsertarPerfil");
const { obtenerModulos } = require("../data/Modulos/ObtenerModulos");
const { obtenerPerfil, obtenerMisPerfiles, obtenerPerfilEmpleado } = require("../data/Perfil/ObtenerPerfil");
const { obtenerDatosEmpleado } = require("../data/Auth/ObtenerDatosEmpleado");
const { crearPago } = require("../Api/MercadoPago/NotificacionPago");
const { obtenerPermisos } = require("../data/Perfil/ObtenerPermisos");

//MercadoPago//
router.get("/createAccessToken",crearAcessToken);
router.post("/createPreference",crearPreferencia);
router.post("/ObtenerPublicKey",obtenerPublicKey);
router.post("/generarURLAutorizacion",generarURLAutorizacion);
router.post("/NotificacionPago",crearPago);
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
router.post("/ObtenerMisReservas",obtenerMisReservas);

//Usuario Auth0
router.post("/AddDatosUsuario", InsertarUsuario);
router.post("/ObtenerCuentaUser",obtenerDatosUsuario);
//--Horarios

//Perfiles
router.post("/AddPerfil",crearPerfil);
router.post("/ObtenerPerfil",obtenerPerfil);
router.post("/ObtenerMisPerfiles",obtenerMisPerfiles);
router.post("/InsertarPerfil",insertarPerfil);
router.post("/ObtenerPermisos",obtenerPermisos);

//Modulos
router.get("/ObtenerModulos",obtenerModulos);

//Empleado

router.post("/ObtenerEmpleados",obtenerDatosEmpleado);
router.post("/ObtenerPerfilEmpleado",obtenerPerfilEmpleado);

module.exports = router;
