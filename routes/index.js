const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index/home');
});

router.get('/about', (req, res) => {
    res.render('index/about');
})

router.get('/contact', (req, res) => {
    res.render('index/contact');
})


module.exports = router;
