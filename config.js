const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: '',
    //Obtener los datos desde el .env
})


module.exports = connection;