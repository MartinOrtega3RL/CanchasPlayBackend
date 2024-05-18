const moment = require("moment");




function obtenerHoraRango(horaApertura,horaCierre){
    const start = moment(horaApertura, "HH:mm:ss");
    const end = moment(horaCierre,"HH:mm:ss");
    const hours = [];

    while(start <= end){
        hours.push(start.format("HH:mm:ss"));
        start.add(1,"hours");
    }
    return hours;
    
}



module.exports = {obtenerHoraRango};