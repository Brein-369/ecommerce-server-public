const {User, Product, Category} = require('../models')
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
        console.log(req.body);
        //findOne tidak ada validate, proses validate hnaya di create dan update jadi 
        //harus pake query model build(create instance tp tidak di save) yang ditambah method validate baru bisa cek validasi
        User.build({
            email: req.body.email,
            password: req.body.password
        }).validate()

        .then(data=>{
        
            return User.findOne({
                where : {
                    email : req.body.email
                }
            })
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
                next({name : "400", message : "Invalid Email or Password"})
            }
            else if(req.body.email && !data){
                next({name : "400", message : "Invalid Email or Password"})
            }
            else {
                throw Error()
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static getAllProduct(req,res,next){
        Product.findAll()
        .then(data=>{
            res.status(200).json(data)
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
            stock : Number(req.body.stock),
            CategoryId: Number(req.body.CategoryId)
        }
        Product.create(obj)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static showEditProduct (req, res, next) {
        Product.findAll({
            where: {
                id : Number(req.params.id)
            },
            include: [Category]
        })
        .then(data => {
            res.status(200).json(data[0])
        }).catch(err => {
            next(err)
        })
    }

    static getAllCategory(req, res, next) {
        console.log('masuk controller get all category<<<<<<<<<<<<<<');
        Category.findAll({
            include: [Product]
        })
        .then(data=>{
            console.log(data);
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static addCategory(req, res, next) {
        console.log(req.body.name);
        let obj = {
            name: req.body.name
        }
        Category.create(obj)
        .then(data=>{
            res.status(201).json(data)
        }).catch(err => {
            next(err)
        })
    }

    static showEditCategory(req,res,next){
        console.log(req.params.id, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        Category.findOne({
            where : {
                id : req.params.id
            }
        }).then(data=>{
            res.status(200).json(data)
        }).catch(err=>{
            next(err)
        })
    }
    
    static updateCategory(req,res,next){
        console.log(req.body);
        let obj = {
            name: (req.body.name).toString()
        }
        Category.update(obj, {
            where : {
                id : Number(req.params.id)
            },
            returning: true
        }).then(data=>{
            res.status(200).json(data[1][0])
        }).catch(err=>{
            next(err)
        })
    }

    static deleteCategory(req,res,next){
        Category.destroy({
            where :{
                id : Number(req.params.id)
            }
        }).then(data=>{
            res.status(200).json({message: "Category deletion success"})
        }).catch(err=>{
            next(err)
        })
    }

    static updateProduct(req, res, next){
        console.log(req.params.id);
        let obj = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : Number(req.body.price),
            stock : Number(req.body.stock),
            CategoryId: Number(req.body.CategoryId)
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
                id : Number(req.params.id)
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