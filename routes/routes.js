const express = require("express");
const router = express.Router();
const { AñadirDatos } = require("../data/Complejo/AñadirDatosComplejo");
const { ModificarDatos, ModificarHorarioComplejo } = require("../data/Complejo/ModifcarDatosComplejo");
const { EliminarComplejo } = require("../data/Complejo/EliminarComplejo");


//Complejo

router.post("/AddDatosComplejo",AñadirDatos);
router.post("/ModDatosComplejo",ModificarDatos);
router.post("/ModHorariosComplejo",ModificarHorarioComplejo);
router.delete("/EliminarComplejo",EliminarComplejo);











module.exports =  router