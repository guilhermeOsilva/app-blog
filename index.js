const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categories = require("./categories/categoriesController");
const articles = require("./articles/articlesController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");

app.set("view engine", "ejs");

//bodyParser
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//static
app.use(express.static("public"));

//database
connection
  .authenticate()
  .then(() => {
    console.log("conexão feita com sucesso");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", categories);
app.use("/", articles);

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles: articles, categories: categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("article", { article: article, categories: categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;

  Category.findOne({
    where: { slug: slug },
    include: { model: Article },
  })
    .then((category) => {
      if (category != undefined) {
          Category.findAll().then(categories => {
            res.render("index", { articles: category.articles, categories});
          })
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.listen(3000, () => {
  console.log(`o servidor está rodando`);
});
