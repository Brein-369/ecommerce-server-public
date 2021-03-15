const express = require('express')
const router = express.Router()
const adminRoutes = require('./adminRoutes')
// const userRoutes = require('./userRoutes')

router.use(adminRoutes)

// router.use(userRoutes)



module.exports = router