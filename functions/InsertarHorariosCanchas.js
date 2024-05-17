const insertHorariosCanchas = async (connection, horarios, canchaId) => {
    if (horarios.length === 0) {
      return; // No hay horarios para insertar
    }
  
    const query = 'INSERT INTO horarios_canchas (Hora_Cancha, Fecha_Cancha, Estado_Hora, Cancha_id_Cancha) VALUES ';
    const values = horarios.map(horario => [
      horario.Hora_Cancha,
      horario.Fecha_Cancha,
      horario.Estado_Hora,
      canchaId
    ]);
  
    const placeholders = values.map(() => '(?,?,?,?)').join(',');
    const flattenedValues = values.flat();
  
    const finalQuery = query + placeholders;
  
    console.log("Insert query:", finalQuery); // Agregar este log
    console.log("With values:", flattenedValues); // Agregar este log
  
    await connection.query(finalQuery, flattenedValues);
  };
  
  module.exports = insertHorariosCanchas;
  