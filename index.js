const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const categories = require('./categories/categoriesController');
const articles = require('./articles/articlesController');
const Article = require("./articles/Article");
const Category = require("./categories/Category");


app.set('view engine', 'ejs');

//bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//static
app.use(express.static('public'));

//database
connection.authenticate()
    .then(() => {
        console.log('conexão feita com sucesso')
    })
    .catch((error) => {
        console.log(error);
    })

app.use("/", categories);
app.use("/", articles);


app.get('/', (req, res) => {
    res.render("index");
})

app.listen(3000, () => {
    console.log(`o servidor está rodando`);
})