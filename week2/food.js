const express = require("express");

const router = express.Router();

router.get('/burger',(req, res)=>{
    res.send(`I'm hungry!`);
});
router.get('/chicken',(req, res)=>{
    res.send(`I'm hungry!`);
});
router.get('/pizza',(req, res)=>{
    res.send(`I'm hungry!`);
});

router.use((req, res, next)=>{
    res.status(404).send("<h1>That fod is not available</h1>")
})
module.exports = router