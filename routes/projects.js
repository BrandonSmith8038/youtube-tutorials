const express = require('express');
const router = express.Router();
const projects = require("../projects.js")


router.get('/number-facts456/', (req, res) => {
    res.sendFile('/projects/youtube-tutorials/views/projects/number-facts1/index.html');
    res.sendFile('/projects/youtube-tutorials/views/projects/number-facts1/main.js');
});


module.exports = router;
