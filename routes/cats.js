const express = require("express");
const router = express.Router();

let catsArray = [
    {id: 1, name: "Cat_1", color: "Brown"},
    {id: 2, name: "Cat_2", color: "White & Black"},
    {id: 3, name: "Cat_3", color: "White"},
    {id: 4, name: "Cat_4", color: "Brown & White"},
];

router.get("/", (req, res) => {
    return res.send(catsArray);
});

router.get("/:id", (req, res) => {
    let requestedID = req.params.id;
    let cat = catsArray.find(cat => cat.id == requestedID);
    if(!cat) {
        return res.status(404).send("The cat you are looking for does not exist");
    }
    return res.send(cat);
});

router.put("/:id", (req, res) => {
    let requestedID = req.params.id;
    let cat = catsArray.find(cat => cat.id == requestedID);
    if(!cat) {
        return res.status(404).send("The cat you are looking for does not exist");
    }
    cat.name = req.body.name;
    cat.color = req.body.color;
    return res.send(cat);
});

router.post("/", (req, res) => {
    if(!req.body.name || !req.body.color) {
        return res.status(400).send("Bad Request");
    }
    let newCat = {
        id : catsArray.length + 1,
        name : req.body.name,
        color : req.body.color
    };
    catsArray.push(newCat);
    res.send(newCat);
});

router.delete("/:id", (req, res) => {
    let cat = catsArray.find((b) => b.id == req.params.id);
    if(!cat) {
        return res.status(404).send("The cat you are looking for does not exist");
    }
    let indexOfCat = catsArray.indexOf(cat);
    catsArray.splice(indexOfCat, 1);
    return res.send(cat);
});

module.exports = router;