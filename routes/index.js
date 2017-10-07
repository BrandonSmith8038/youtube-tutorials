const express = require('express');
const router = express.Router();
const projects = require("../projects.js")
// const myProjects = {
//     projects: [{
//             "first": "Brandon",
//             "Last": "Smith",
//             "address": "24828 W. Quails Nest Ln."
// 	},
//         {

//             "first": "Amber",
//             "Last": "Cahill",
//             "address": "16277 W. Jackson"

// 	}

// ]
// }



router.get('/', (req, res) => {
    console.log(projects);
    res.render('index/home', projects);
});

router.get('/about', (req, res) => {
    res.render('index/about');
})

router.get('/contact', (req, res) => {
    res.render('index/contact');
})


module.exports = router;
