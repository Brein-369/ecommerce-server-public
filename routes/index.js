const express = require('express')
const router = express.Router()
const adminRoutes = require('./adminRoutes')
const userRoutes = require('./userRoutes')



router.use(adminRoutes)
router.use('/user',userRoutes)



module.exports = router