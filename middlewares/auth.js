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
            throw Error()
        })

    } catch (error) {
        next(error)
    }
}

const authorize = (req, res, next)=>{

    User.findByPk(req.currentUser.id)
    .then(data=>{
        if(data === null){
            next({name : "404", message: "Admin not available"})
        }
        else if (data && data.role === "admin"){
            next()
        }
        else{
            next({name : "401"})
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