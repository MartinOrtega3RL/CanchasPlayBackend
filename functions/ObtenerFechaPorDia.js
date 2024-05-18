const moment = require('moment');


function obtenerFechasProximosDosMeses(diaSemana) {
    const hoy = moment();
    const fechas = [];

    let proximaFecha = hoy.clone().isoWeekday(diaSemana);
    if (proximaFecha.isBefore(hoy, 'day')) {
        proximaFecha.add(1, 'weeks');
    }

    for (let i = 0; i < 8; i++) { // 8 semanas para cubrir aproximadamente 2 meses
        fechas.push(proximaFecha.clone().format('YYYY-MM-DD'));
        proximaFecha.add(1, 'weeks');
    }

    return fechas;
}

module.exports = {obtenerFechasProximosDosMeses};