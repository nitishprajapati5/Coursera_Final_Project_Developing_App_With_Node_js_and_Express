const Router = require('express')
const booksController = require('../controllers/bookController')
const router = Router();

router.get("/books",booksController.getAllBooks);
router.post("/books/getbyISBN",booksController.getBooksByISBN)
router.post("/books/getbyTitle",booksController.getBooksbyTitle)
router.post("/books/getByAuthor",booksController.getBooksbyAuthor)
router.post("/Addbooks",booksController.addBook)

module.exports = router;