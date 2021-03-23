const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const {authorize, authenticate} = require('../middlewares/adminAuth')

router.post('/register', adminController.register)
router.post('/login', adminController.login)

// router.use(authenticate, authorize,)
router.get('/category', authenticate, authorize,adminController.getAllCategory)
router.post('/category',authenticate, authorize, adminController.addCategory)
router.get('/category/:id',authenticate, authorize, adminController.showEditCategory)
router.patch('/category/:id',authenticate, authorize, adminController.updateCategory)
router.delete('/category/:id',authenticate, authorize, adminController.deleteCategory)

router.get('/products',authenticate, authorize, adminController.getAllProduct)
router.post('/products',authenticate, authorize, adminController.addProduct)
router.get('/products/:id',authenticate, authorize, adminController.showEditProduct)
router.put('/products/:id',authenticate, authorize, adminController.updateProduct)
router.delete('/products/:id',authenticate, authorize, adminController.deleteProduct)


module.exports = router