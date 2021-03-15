const request = require("supertest")
const app = require('../app')
const {User,Product} = require('../models')
const {generateToken} = require('../helpers/jwt')

describe("testing admin /DELETE success",()=>{

    let token
    let idProduct
    beforeAll((done)=>{
        User.destroy({
            where : {}
        })
        .then(()=>{
            let obj = {
                email : "admin@mail.com",
                password : "123456",
                role : "admin"
            }
            return User.create(obj)
        })
        .then(data=>{
            console.log(data, "masuk create admin success <<<<<<<<<<<<<<<");

            //generate token hasil dari create admin
            token = generateToken({
                id : data.id,
                email : data.email
            })
            
            return Product.destroy({
                where : {}
            })
        })
        .then(()=>{
            let obj = {
                name : "sepatu adidaz",
                image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
                price : 1000000,
                stock : 500
            }
            return Product.create(obj)
        
        })
        .then((dataProduct)=>{
            //berhasil create product
            idProduct = dataProduct.id
            done()
        })
        .catch(done)

    })
    
    
    it("should return response with status code 200",(done)=>{
        
        request(app)
        .delete('/products/'+ idProduct)
        .set('access_token', token)
        .end((err,res)=>{
            if(err){
                done(err)
            }
            else{
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("message", "Product deletion success" )
                
                done()
            }
        })
    })   
    
})





describe("testing admin /DELETE no access token",()=>{

    let token
    let idProduct
    beforeAll((done)=>{
        User.destroy({
            where : {}
        })
        .then(()=>{
            let obj = {
                email : "admin@mail.com",
                password : "123456",
                role : "admin"
            }
            return User.create(obj)
        })
        .then(data=>{
            console.log(data, "masuk create admin success <<<<<<<<<<<<<<<");

            //generate token hasil dari create admin
            token = generateToken({
                id : data.id,
                email : data.email
            })
            
            return Product.destroy({
                where : {}
            })
        })
        .then(()=>{
            let obj = {
                name : "sepatu adidaz",
                image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
                price : 1000000,
                stock : 500
            }
            return Product.create(obj)
        
        })
        .then((dataProduct)=>{
            //berhasil create product
            idProduct = dataProduct.id
            done()
        })
        .catch(done)

    })
    
    
    it("should return response with status code 401",(done)=>{
        
        request(app)
        .delete('/products/'+ idProduct)
        // no access token
        // .set('access_token', token)
        .end((err,res)=>{
            if(err){
                done(err)
            }
            else{
                expect(res.statusCode).toEqual(401)
                expect(res.body).toHaveProperty('message', "Authorization Error")
                expect(res.body).toHaveProperty('detail', "Access Token Error")
                done()
            }
        })
    })   
    
})





describe("testing admin /DELETE ada access token tp bukan admin",()=>{

    let token
    let idProduct
    beforeAll((done)=>{
        User.destroy({
            where : {}
        })
        .then(()=>{
            let obj = {
                email : "customer@mail.com",
                password : "123456"
            }
            return User.create(obj)
        })
        .then(data=>{

            token = generateToken({
                id : data.id,
                email : data.email
            })
            
            return Product.destroy({
                where : {}
            })
        })
        .then(()=>{
            let obj = {
                name : "sepatu adidaz",
                image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
                price : 1000000,
                stock : 500
            }
            return Product.create(obj)
        
        })
        .then((dataProduct)=>{
            //berhasil create product
            idProduct = dataProduct.id
            done()
        })
        .catch(done)

    })
    
    
    it("should return response with status code 401",(done)=>{
        
        request(app)
        .delete('/products/'+ idProduct)
        .set('access_token', token)
        .end((err,res)=>{
            if(err){
                done(err)
            }
            else{
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("message", "Authorization Error")
                expect(res.body).toHaveProperty("detail", "you are not admin")
                done()
            }
        })
    })   
    
})