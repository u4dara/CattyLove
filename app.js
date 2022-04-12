const express = require("express");
const app = express();
const cats = require("./routes/cats");
const Port = 3000;

app.use(express.json());
app.use('/api/cats', cats)

app.get("/", (req, res) => {
    return res.send("Wellcome to CattyLove");
});

app.listen(Port, () => {
    console.log("Started Listning on Port" + Port);
});