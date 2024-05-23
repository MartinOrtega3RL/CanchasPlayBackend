const express = require("express");
const router = express.Router();
const { AñadirDatos } = require("../data/Complejo/AñadirDatosComplejo");
const { ModificarDatos, ModificarHorarioComplejo } = require("../data/Complejo/ModifcarDatosComplejo");
const { EliminarComplejo } = require("../data/Complejo/EliminarComplejo");
const { addDatosCancha, testAddHorarios } = require("../data/Cancha/InsertarDatosCancha");


//Complejo
router.post("/AddDatosComplejo",AñadirDatos);
router.post("/ModDatosComplejo",ModificarDatos);
router.post("/ModHorariosComplejo",ModificarHorarioComplejo);
router.delete("/EliminarComplejo",EliminarComplejo);
//Cancha
router.post("/AddDatosCancha",addDatosCancha);
router.get("/testAddHorarios",testAddHorarios);


//Reserva
//--Horarios













module.exports =  router