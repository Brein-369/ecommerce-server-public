const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {userAuthenticate, userAuthorization} = require('../middlewares/userAuth')


router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)

router.use(userAuthenticate)
router.get('/products', userController.userGetAllProduct)
router.post('/cart', userController.userAddCart)
router.get('/cart', userController.userGetAllCart)
// router.delete('/cart/checkout', userController.userCheckout)

router.patch('/cart/addqty/:id', userAuthorization, userController.userAddQuantityCart)
router.patch('/cart/subqty/:id', userAuthorization, userController.userSubtractQuantityCart)
router.delete('/cart/:id',userAuthorization, userController.userDeleteCart)


module.exports = router