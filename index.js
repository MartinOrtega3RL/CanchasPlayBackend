const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/routes");
const bodyParser = require('body-parser');

// Aumenta el límite de tamaño de la solicitud
app.use(bodyParser.json({ limit: '50mb' })); // Puedes ajustar el límite según tus necesidades
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Para solicitudes URL-encoded

app.use(cors());
app.use(express.json()); // Middleware para parsear JSON después de bodyParser
app.use(router);

const port = 9090;

app.get("/", (req, res) => {
  res.send("Funca");
});

app.listen(port, () => {
  console.log(`the server is now running on port ${port}`);
});


// Manejo de excepciones no controladas
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Esto hará que nodemon reinicie la aplicación
});

// Manejo de rechazos de promesas no manejados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // Esto hará que nodemon reinicie la aplicación
});
