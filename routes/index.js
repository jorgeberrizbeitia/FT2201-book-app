const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


const bookRoutes = require("./books.routes")
router.use("/books", bookRoutes)

module.exports = router;
