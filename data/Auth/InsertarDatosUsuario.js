const { connection } = require("../../config");
const axios = require("axios");
require("dotenv").config();

const InsertarUsuario = (req, res) => {
  const { email, password, nombre, apellido, dni, telefono } = req.body;

  let data = JSON.stringify({
    email: email,
    user_metadata: {},
    blocked: false,
    email_verified: false,
    app_metadata: {},
    given_name: nombre,
    family_name: apellido,
    nickname: email,
    picture: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg",
    connection: "CanchasDB-Users",
    password: password,
    verify_email: true,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: process.env.URL_API_AUTH0,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(req.body.email);
};

module.exports = { InsertarUsuario };
