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
const projects = require("./routes/projects");





//Use Routes
app.use('/', index);
app.use('/projects', projects);

//Set static folder
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/number-facts')));


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App Started on port ${port}`);
})
