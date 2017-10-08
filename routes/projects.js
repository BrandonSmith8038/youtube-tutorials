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



router.get('/number-facts/', (req, res) => {
    res.send('Testing 123');
});


module.exports = router;
