const express = require("express");
const { rawListeners } = require("../models/cat");
const Cat = require("../models/cat");
const router = express.Router();


router.get("/", async (req, res) => {
    try{
        let cats = await Cat.find().sort({name : "asc"});
        return res.send(cats);
    }
    catch(err){
        return res.status(500).send("Error :", err.message);
    }
});

router.get("/:id", async (req, res) => {
    let requestedID = req.params.id;
    let cat = await Cat.findById(requestedID);
    if(!cat) {
        return res.status(404).send("The cat you are looking for does not exist");
    }
    return res.send(cat);
});

router.put("/:id", async (req, res) => {
    let requestedID = req.params.id;
    let cat = await Cat.findById(requestedID);

    if(!cat) {
        return res.status(404).send("The cat you are looking for does not exist");
    }
    
    cat.set({
        name: req.body.name,
        gender: req.body.gender,
        description: req.body.description,
        likeCount: req.body.likeCount,
        imageUrl: req.body.imageUrl
    });
    try{
        cat = await cat.save()
        return res.send(cat);
    }
    catch(err){
        return res.status(500).send("Error :", err.message);
    }
});

router.post("/", async (req, res) => {
    if(!req.body.name) {
        return res.status(400).send("Cat's name can not be empty.");
    }
    else if(req.body.name.length<3 || req.body.name.length>20){
        return res.status(400).send("Cat's name can not be less than 3 letters or greater than 20 letters.");
    }
    else if(!req.body.gender){
        return res.status(400).send("Cat's gender can not be empty.");
    }
    else if(req.body.description.length>200){
        return res.status(400).send("Cat's description can not greater than 200 letters.");
    }
    let newCat = new Cat({
        name : req.body.name,
        gender : req.body.gender,
        description : req.body.description,
        likeCount : req.body.likeCount,
        imageUrl : req.body.imageUrl
    });
    try {
        newCat = await newCat.save();
        return res.send(newCat);
    }
    catch(err){
        return res.status(500).send("")
    }
    
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