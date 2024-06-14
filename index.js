const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routes/routes");
const bodyParser = require('body-parser');
require('./functions/Reserva/ActualizarEstadoReserva');

// Configura Helmet para CSP
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'", // Necesario para algunos scripts de Mercado Pago
      "https://http2.mlstatic.com", // Permite los scripts de Mercado Pago
      "https://www.mercadopago.com"
    ],
    // Agrega otras directivas según sea necesario
  },
  reportOnly: false, // Establecer en true para pruebas
}));

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
  console.log(`The server is now running on port ${port}`);
});
