const express = require("express");
const exphbs = require('express-handlebars');
const path = require("path");

const app = express();


// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Load Routes
const index = require("./routes/index");


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Use Routes
app.use('/', index);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App Started on port ${port}`);
})
