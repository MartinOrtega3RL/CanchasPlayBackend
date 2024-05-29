const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/routes");

app.use(express.json());
app.use(cors());
app.use(router)

const port = 9090



app.get("/", (req,res) => {
    res.send("Funca");
})

app.listen(port, () => {
  console.log("the server is now running on port 8080");
});
