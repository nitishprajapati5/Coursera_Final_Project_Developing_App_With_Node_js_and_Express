const Router = require('express')
const authControllers = require('../controllers/authController')
const router = Router()

router.post("/auth/register",authControllers.register)
router.post("/auth/login",authControllers.login);

module.exports = router;