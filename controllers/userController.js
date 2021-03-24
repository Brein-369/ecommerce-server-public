const {User, Product, Wishlist, Cart, sequelize} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt');

class UserController {

    static userRegister(req,res,next){
        console.log('masuk register user');
        console.log(req.body);
        let obj = {
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone
        }
        User.create(obj)
        .then(data=>{
            res.status(201).json({
                email: data.email,
                address: data.address,
                phone: data.phone
            })
        })
        .catch(err=>{
            next(err)
        })
    }
    static userLogin(req,res,next){
        User.build({
            email: req.body.email,
            password: req.body.password
        }).validate()
        .then(()=>{
            return User.findOne({
                where: {
                    email: req.body.email
                }
            })
        })
        .then(data=>{
            if(data && comparePassword(req.body.password, data.password)){
                console.log(data);
                let payload = {
                    id: data.id,
                    email: data.email
                }
                res.status(200).json({
                    ...payload,
                    address: data.address,
                    phone: data.phone,
                    access_token: generateToken(payload)
                })
            }
            else if(data && !comparePassword(req.body.password, data.password)){
                next({name: "400", message: 'Invalid Email or Password'})
            }
            else if(!data){
                next({name: "400", message: 'Invalid Email or Password'})
            }
            else{
                throw Error()
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static userGetAllProduct(req,res,next){
        Product.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })

    }
    static userGetAllCart(req,res,next){
        Cart.findAll({
            include: [Product]
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static userGetAllWishlist (req,res,next){
        Wishlist.findAll({
            where: {
                UserId: req.currentUser.id
            },
            include: [Product]
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static userAddWishlist(req,res,next){
        
        Wishlist.findOrCreate({
            where: {
                UserId : req.currentUser.id,
                ProductId: req.body.ProductId
            }
        })
        .then(data=>{
            if (data[1]){
                res.status(201).json(data)
            }
            else {
                res.status(200).json(data)
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    // static userAddWishlistToCart(req,res,next){
    //     let obj = {
            
    //     }
    //     Cart.create(obj)
    //     .then(data=>{

    //     })
    //     .catch(err=>{

    //     })
    // }

    static userDeleteWishlist(req,res,next){
        Wishlist.destroy({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(data=>{
            res.status(200).json({message: "Wishlist Deletion Success"})
        })
        .catch(err=>{
            next(err)
        })
    }

    static userAddCart(req,res,next){
        Cart.findOrCreate({
            where: {
                UserId : req.currentUser.id,
                ProductId: req.body.ProductId
            },
            defaults : {
                quantity: 1
            }
        })
        .then(data=>{
            // data[1] represent boolean find(false) or create(true)
            if (data[1]){
                res.status(201).json(data)
            }
            else {
                res.status(200).json(data)
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static userAddQuantityCart(req,res,next){
        Cart.increment('quantity',{
            by: 1,
            where: {
                id: req.params.id
            }
        })
        .then(data=>{
            console.log(data);
            res.status(200).json({message: "Adding Cart Quantity Success"})
        })
        .catch(err=>{
            next(err)
        })
    }
    static userSubtractQuantityCart(req,res,next){
        Cart.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data=>{
            if(data.quantity === 1){
                return Cart.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            }
            else{
                return Cart.decrement('quantity',{
                    by: 1,
                    where: {
                        id: req.params.id
                    }
                })
            }
        })
        .then(data=>{
            res.status(200).json({message: "Subtract Cart Quantity Success"})
        })
        .catch(err=>{
            next(err)
        })
    }
    static userDeleteCart(req,res,next){
        Cart.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data=>{
            res.status(200).json({message: "Cart Deletion Success"})
        })
        .catch(err=>{
            next(err)
        })
    }
    static async userCheckout(req,res,next){
        await Cart.findAll({
            where :{
                UserId : req.currentUser.id
            },
            include : [Product]
        })
        .then(data=>{
            // let totalToBePaid = 0
            const checkout = async ()=>{
                for(let i = 0; i< data.length; i++){
                    try {    
                        const result = await sequelize.transaction(async (t)=>{
                                
                            await Product.decrement('stock', {
                                by: data[i].quantity,
                                where: {
                                    id: data[i].ProductId
                                },
                                transaction : t
                            })

                          
                            await Cart.destroy({
                                where: {
                                    id: data[i].id
                                },
                                transaction : t
                            })
                            
                        })
                        console.log(result, 'result sequelize');

                    } catch (error) {
                        console.log(error,"<<<<<< error try catch");
                    }
                }
                // console.log(totalToBePaid,"<<<< total tobe paid");
                // return totalToBePaid
            }
            checkout()
            res.status(200).json({"message": "Checkout Success"})

        })
        .catch(err=>{
            next(err)
        })
    }




}

module.exports = UserController