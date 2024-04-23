const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const port = 8080


app.get("/", (req,res) => {
    res.send("Funca");
})

app.listen(port, () => {
  console.log("the server is now running on port 8080");
});