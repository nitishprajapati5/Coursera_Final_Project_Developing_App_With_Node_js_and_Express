const Router = require('express')

const router = Router();

router.get("/books","");
router.post("/books/getbyISBN","")
router.post("/books/getbyTitle","")
router.post("/books/getByAuthor","")
router.post("/Addbooks","")

module.exports = router;