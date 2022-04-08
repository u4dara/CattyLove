const express = require("express");
const app = express();
const Port = 3000;

app.use(express.json());

let catsArray = [
    {id: 1, name: "Cat_1", color: "Brown"},
    {id: 2, name: "Cat_2", color: "White & Black"},
    {id: 3, name: "Cat_3", color: "White"},
    {id: 4, name: "Cat_4", color: "Brown & White"},
];

app.get("/", (req, res) => {
    return res.send("Wellcome to CattyLove");
});

app.get("/api/cats", (req, res) => {
    return res.send(catsArray);
});

app.get("/api/cats/:id", (req, res) => {
    let requestedID = req.params.id;
    let cat = catsArray.find(cat => cat.id == requestedID);
    if(!cat) {
        return res.status(404).send("The cat you are looking for does not exist");
    }
    return res.send(cat);
});

app.put("/api/cats/:id", (req, res) => {
    let requestedID = req.params.id;
    let cat = catsArray.find(cat => cat.id == requestedID);
    if(!cat) {
        return res.status(404).send("The cat you are looking for does not exist");
    }
    cat.name = req.body.name;
    cat.color = req.body.color;
    return res.send(cat);
});



app.listen(Port, () => {
    console.log("Started Listning on Port" + Port);
});