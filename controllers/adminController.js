const {User, Product} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class adminController {

    static register(req,res,next){
        let obj = {
            email : req.body.email,
            password : req.body.password,
            role : "admin"
        }
        User.create(obj)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static login(req, res, next){
        User.findOne({
            where : {
                email : req.body.email
            }
        })
        .then(data=>{
            if(data && comparePassword(req.body.password, data.password)){
                let payload ={
                    id : data.id,
                    email : data.email
                }
                res.status(200).json({
                    ...payload,
                    access_token : generateToken(payload)
                })
            }
            else if(data && !comparePassword(req.body.password, data.password)){
                next({name : "401", message : "Invalid Email or Password"})
            }
            else if(req.body.email && !data){
                next({name : "401", message : "Invalid Email or Password"})
            }
            else {
                throw Error()
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static addProduct(req, res, next){
        let obj = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : Number(req.body.price),
            stock : Number(req.body.stock)
        }
        Product.create(obj)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    
    static updateProduct(req, res, next){
        console.log(req.params.id);
        let obj = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : Number(req.body.price),
            stock : Number(req.body.stock)
        }
        Product.update(obj,{
            where : {
                id : Number(req.params.id)
            },
            returning : true
        })
        .then(data=>{
            res.status(200).json(data[1][0])
        })
        .catch(err=>{
            next(err)
        })
    }
    
    static deleteProduct(req, res, next){
        Product.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(data=>{
            res.status(200).json({message : "Product deletion success"})
        })
        .catch(err=>{
            next(err)
        })
    }

}

module.exports = adminController