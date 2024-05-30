const express = require("express");
const router = express.Router();
const { AñadirDatos } = require("../data/Complejo/AñadirDatosComplejo");
const {
  ModificarDatos,
  ModificarHorarioComplejo,
} = require("../data/Complejo/ModifcarDatosComplejo");
const { EliminarComplejo } = require("../data/Complejo/EliminarComplejo");
const {
  addDatosCancha,
  testAddHorarios,
} = require("../data/Cancha/InsertarDatosCancha");
const {
  obtenerDatosComplejo,
} = require("../data/Complejo/ObtenerDatosComplejo");
const { ObtenerDatosCancha } = require("../data/Cancha/ObtenerDatosCancha");
const {
  ObtenerHorariosCancha,
} = require("../data/Cancha/ObtenerHorariosCancha");
const { InsertarUsuario } = require("../data/Auth/InsertarDatosUsuario");

//Complejo
router.post("/AddDatosComplejo", AñadirDatos);
router.post("/ModDatosComplejo", ModificarDatos);
router.post("/ModHorariosComplejo", ModificarHorarioComplejo);
router.delete("/EliminarComplejo", EliminarComplejo);
router.get("/ObtenerDatosComplejo", obtenerDatosComplejo);
//Cancha
router.post("/AddDatosCancha", addDatosCancha);
router.post("/ObtenerDatosCancha", ObtenerDatosCancha);
router.post("/ObtenerHorariosCancha", ObtenerHorariosCancha);
router.get("/testAddHorarios", testAddHorarios);
//Reserva

//Usuario Auth0

router.post("/AddDatosUsuario", InsertarUsuario);
//--Horarios

module.exports = router;
