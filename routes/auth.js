const Router = require('express')
const authControllers = require('../controllers/auth')
const router = Router()
debugger;
router.post("/auth/register",authControllers.register)
router.post("/auth/login",authControllers.login);

module.exports = router;