const router = require("express").Router();
const AuthorModel = require("../models/Author.model");
const BookModel = require("../models/Book.model")

// GET "/books" ruta para mostrar todos los libros al usuario
router.get("/", (req, res, next) => {
  
  // buscar los libros de la base de datos
  BookModel.find()
  .then((allBooks) => {
    // renderizar los libros
    res.render("books/books.hbs", { allBooks })
  })
  .catch((err) => {
    next(err)
  })

})

// GET "/books/:id/details" para mostrar detalles de un libro al usuario
router.get("/:id/details", (req, res, next) => {

  // console.log(req.params)
  // const id = req.params.id
  const { id } = req.params
  console.log(id)

  // necesitamos buscar el libro en de BD
  BookModel.findById(id)
  .then((oneBook) => {
    // renderizar el libro al usuario
    res.render("books/book-details.hbs", {oneBook})
  })
  .catch((err) => {
    next(err)
  })

})

// GET "/books/create" => renderizar el formulario de crear libro
router.get("/create", (req, res, next) => {

  AuthorModel.find()
  .then((allAuthors) => {
    res.render("books/create-form.hbs", { allAuthors } )
  })
  .catch((err) => {
    next(err)
  })

})

// POST "/books/create" => agregar el nuevo libro a la BD
router.post("/create", (req, res, next) => {

  console.log(req.body)

  BookModel.create({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author
  })
  .then((createBook) => {
    // en este punto, hemos creado el libro
    // ? que queremos hacer con el usuario luego de crear libro
    // res.redirect("/books") // siempre empieza con barra, indica URL
    res.redirect(`/books/${createBook._id}/details`)
  })
  .catch((err) => {
    next(err)
  })

})

// GET "/books/:id/edit" => renderizar el formulario para editar
router.get("/:id/edit", (req, res, next) => {

  const { id } = req.params

  BookModel.findById(id)
  .then((oneBook) => {
    // pasamos el libro a la vista para el prellenado de los inputs
    res.render("books/edit-form.hbs", {oneBook})
  })
  .catch((err) => {
    next(err)
  })

})

// POST "/books/:id/edit" => actualizar el libro en la BD y redireccionar al usuario
router.post("/:id/edit", (req, res, next) => {

  const { id } = req.params

  const { title, description, author } = req.body

  BookModel.findByIdAndUpdate(id, { 
    title, 
    description, 
    author 
  })
  .then((updatedBook) => {
    res.redirect(`/books/${updatedBook._id}/details`)
  })
  .catch(err => {
    next(err)
  })

})

router.post("/:id/delete", async (req, res, next) => {

  try {
    const { id } = req.params
  
    // borrar el elemento de la BD
    // const deletedBook = await BookModel.findByIdAndDelete(id)
    await BookModel.findByIdAndDelete(id)
  
    // redireccionar al usuario a /books
    res.redirect("/books")
  }
  catch(err) {
    next(err)
  }
  // recibir el id

})


module.exports = router;
