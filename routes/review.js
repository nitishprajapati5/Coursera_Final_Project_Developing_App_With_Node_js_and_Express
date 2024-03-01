const Router = require('express')

const router = Router();

router.put("/books/:id/reviews","authenticate","");
router.delete("/books/:id/reviews","authenticate","");

//For All Users
router.get("/books/:id/reviews","")

module.exports = router;