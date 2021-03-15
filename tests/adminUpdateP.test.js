const request = require("supertest")
const app = require('../app')
const {User,Product} = require('../models')
const {generateToken} = require('../helpers/jwt')

describe("testing admin /PUT update",()=>{

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
        const body = {
            name : "sepatu adidaya",
            image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
            price : 1234567,
            stock : 50
        }
        request(app)
        .put('/products/'+ idProduct)
        .set('access_token', token)
        .send(body)
        .end((err,res)=>{
            if(err){
                done(err)
            }
            else{
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("id")
                expect(typeof res.body.id).toEqual("number")
                expect(res.body).toHaveProperty("name",body.name)    
                expect(typeof res.body.name).toEqual("string")
                expect(res.body).toHaveProperty("image_url", body.image_url)    
                expect(typeof res.body.image_url).toEqual("string")
                expect(res.body).toHaveProperty("price", body.price)    
                expect(typeof res.body.price).toEqual("number")
                expect(res.body).toHaveProperty("stock", body.stock)    
                expect(typeof res.body.stock).toEqual("number")
                done()
            }
        })
    })   
    
})


describe("testing admin /PUT update tidak ada token",()=>{

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
        const body = {
            name : "sepatu adidaya",
            image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
            price : 1234567,
            stock : 50
        }
        request(app)
        .put('/products/'+ idProduct)
        //access token tidak diberikan
        // .set('access_token', token)
        .send(body)
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



describe("testing admin /PUT update stock minus",()=>{

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
    
    
    it("should return response with status code 400",(done)=>{
        const body = {
            name : "sepatu adidaya",
            image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
            price : 1234567,
            stock : -100
        }
        request(app)
        .put('/products/'+ idProduct)
        .set('access_token', token)
        .send(body)
        .end((err,res)=>{
            if(err){
                done(err)
            }
            else{
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("theErr")
                expect(res.body.theErr).toEqual(expect.arrayContaining(['stock minimal 1']))

                done()
            }
        })
    })   
    
})






describe("testing admin /PUT update stock diisi string",()=>{

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
    
    
    it("should return response with status code 400",(done)=>{
        const body = {
            name : "sepatu adidaya",
            image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
            price : 1234567,
            stock : "dua ratus"
        }
        request(app)
        .put('/products/'+ idProduct)
        .set('access_token', token)
        .send(body)
        .end((err,res)=>{
            if(err){
                done(err)
            }
            else{
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("message", "Bad Request")
                expect(res.body).toHaveProperty("detail", "invalid input syntax for integer: \"NaN\"")

                done()
            }
        })
    })   
    
})






describe("testing admin /PUT update price diisi minus",()=>{

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
    
    
    it("should return response with status code 400",(done)=>{
        const body = {
            name : "sepatu adidaya",
            image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
            price : -1234567,
            stock : 100
        }
        request(app)
        .put('/products/'+ idProduct)
        .set('access_token', token)
        .send(body)
        .end((err,res)=>{
            if(err){
                done(err)
            }
            else{
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("theErr")
                expect(res.body.theErr).toEqual(expect.arrayContaining(['price minimal 1']))
                done()
            }
        })
    })   
    
})
