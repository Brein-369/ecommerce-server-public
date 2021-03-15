const {User, Product} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const authenticate = (req, res, next)=>{
    try {
        let {id, email} = verifyToken(req.headers.access_token)
        User.findByPk(id)
        .then(data=>{
            req.currentUser = {
                id : data.id,
                email : data.email
            }
            next()
        })
        .catch(err=>{
            next({name:"401", message :"Authentication Error" })
        })

    } catch (error) {
        next({name : "401", message :"Access Token Error"})
    }
}

const authorize = (req, res, next)=>{

    User.findByPk(req.currentUser.id)
    .then(data=>{
        if (data && data.role === "admin"){
            next()
        }
        else if (data && data.role !== "admin"){
            next({name : "401", message : "you are not admin"})
        }
    })  
    .catch(err=>{
        next(err)
    })

}

module.exports = {
    authenticate,
    authorize
}