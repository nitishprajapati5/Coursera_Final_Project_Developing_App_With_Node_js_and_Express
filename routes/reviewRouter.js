const Router = require('express'); // Correct import statement
const authenticate = require('../middleware/middlewareauthenticate');
const reviewController = require('../controllers/bookReviewController')
const router = Router();

router.get("/books/:id/reviews", reviewController.getReview);
router.post("/books/:id/reviews", authenticate, reviewController.addReview);
router.put("/books/:id/reviews",authenticate,reviewController.updateReview);
router.delete("/books/:id/reviews", authenticate, reviewController.deleteReview);


module.exports = router;
