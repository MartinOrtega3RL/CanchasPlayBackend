const generateHorariosCanchas = (horaApertura, horaCierre, diaSemanaId) => {
    const horariosCanchas = [];
    let currentHora = new Date(`1970-01-01T${horaApertura}:00`);
    const endHora = new Date(`1970-01-01T${horaCierre}:00`);
  
    while (currentHora <= endHora) {
      horariosCanchas.push({
        Hora_Cancha: currentHora.toTimeString().slice(0, 5),
        Fecha_Cancha: null,  // Aquí debes implementar la lógica para generar las fechas correctas
        Estado_Hora: 'disponible',
        Dia_Semana_Id: diaSemanaId
      });
      currentHora.setHours(currentHora.getHours() + 1);
    }
  
    console.log("Generated horarios:", horariosCanchas); // Agregar este log
  
    return horariosCanchas;
  };
  
  module.exports = generateHorariosCanchas;
  