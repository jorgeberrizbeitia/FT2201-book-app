const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


const bookRoutes = require("./books.routes")
router.use("/books", bookRoutes)

const authorRoutes = require("./author.routes")
router.use("/authors", authorRoutes)

module.exports = router;
