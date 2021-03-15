const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const {authorize, authenticate} = require('../middlewares/auth')

router.post('/register', adminController.register)
router.post('/login', adminController.login)

// router.use(authenticate, authorize)
router.post('/products', adminController.addProduct)
router.put('/products', adminController.updateProduct)
router.delete('/products', adminController.deleteProduct)


module.exports = router