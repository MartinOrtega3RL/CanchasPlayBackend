const express = require("express");
const router = express.Router();
const { AñadirDatos } = require("../data/Complejo/AñadirDatosComplejo");


//Complejo

router.post("/AddDatosComplejo",AñadirDatos);










module.exports =  router