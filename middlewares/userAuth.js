const {User, Cart, Product} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const userAuthenticate = (req,res,next)=>{
    console.log('masuk authentication user');
    try {
        let {id, email} = verifyToken(req.headers.access_token)
        User.findByPk(id)
        .then(data=>{
            if(data){
                req.currentUser = {
                    id: data.id,
                    email: data.email
                }
                next()
            }
            else{
                next({name: "401", message: "User authentication error"})
            }
        })
        .catch(err=>{
            next(err)
        })
    } catch (error) {
        next(error)
    }
}

const userAuthorization = (req,res,next)=>{
    Cart.findByPk(req.params.id)
    .then(data=>{
        if(data && data.UserId === req.currentUser.id){
            next()
        }
        else if(data && data.UserId !== req.currentUser.id){
            next({name: "401", message: "User Has no Authorization to this Cart"})
        }
        else{
            next({name: "404", message: "Cart not found"})
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = {
    userAuthenticate,
    userAuthorization
}