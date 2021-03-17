const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const {authorize, authenticate} = require('../middlewares/adminAuth')

router.post('/register', adminController.register)
router.post('/login', adminController.login)

router.use(authenticate, authorize)
router.get('/category', adminController.getAllCategory)
router.get('/products', adminController.getAllProduct)
router.post('/products', adminController.addProduct)
router.get('/products/:id', adminController.showEditProduct)
router.put('/products/:id', adminController.updateProduct)
router.delete('/products/:id', adminController.deleteProduct)


module.exports = router