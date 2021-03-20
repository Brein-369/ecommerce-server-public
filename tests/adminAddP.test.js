const request = require("supertest")
const app = require('../app')
const {User,Product} = require('../models')
const {generateToken} = require('../helpers/jwt')

describe("testing admin /POST add",()=>{

    let token

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
            done()
        })
        .catch(done)

    })
    
    
    it("should return response with status code 201",(done)=>{
        const body = {
            name : "sepatu adidas",
            image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
            price : 1000000,
            stock : 5,
            CategoryId : 1
        }
        request(app)
        .post('/products')
        .set('access_token', token)
        .send(body)
        .end((err,res)=>{
            if(err){
                done(err)
            }
            else{
                expect(res.statusCode).toEqual(201)
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

describe("testing admin /POST add tidak ada access token",()=>{

    let token

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
            done()
        })
        .catch(done)

    })
    
    
    it("should return response with status code 401",(done)=>{
        const body = {
            name : "sepatu adidas",
            image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
            price : 1000000,
            stock : 5
        }
        request(app)
        .post('/products')
        //tidak ada access token
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




describe("testing admin /POST add tapi bukan role admin",()=>{
    // ada access token tapi bukan role admin
    let token2

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
            token2 = generateToken({
                id : data.id,
                email : data.email
            })
            
            return Product.destroy({
                where : {}
            })
        })
        .then(()=>{
            done()
        })
        .catch(done)

    })

    it("should return response with status code 401",(done)=>{
        const body = {
            name : "sepatu adidas",
            image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
            price : 1000000,
            stock : 5
        }
        request(app)
        .post('/products')
        .set('access_token', token2)
        .send(body)
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



describe("testing admin /POST add tapi required tidak diisi",()=>{
    let token2

    beforeAll((done)=>{
        User.destroy({
            where : {}
        })
        .then(()=>{
            let obj = {
                email : "admin@mail.com",
                password : "123456",
                role :"admin"
            }
            return User.create(obj)
        })
        .then(data=>{
            //generate token hasil dari create admin
            token2 = generateToken({
                id : data.id,
                email : data.email
            })
            
            return Product.destroy({
                where : {}
            })
        })
        .then(()=>{
            done()
        })
        .catch(done)

    })

    it("should return response with status code 400",(done)=>{
        const body = {
            name : "",
            image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
            price : 1000000,
            stock : 5
        }
        request(app)
        .post('/products')
        .set('access_token', token2)
        .send(body)
        .end((err,res)=>{
            if(err){
                done(err)
            }
            else{
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("theErr")
                expect(res.body.theErr).toEqual(expect.arrayContaining(['name is required']))
                done()
            }
        })
    })

})
    



describe("testing admin /POST add tapi stock diisi minus",()=>{
    let token2

    beforeAll((done)=>{
        User.destroy({
            where : {}
        })
        .then(()=>{
            let obj = {
                email : "admin@mail.com",
                password : "123456",
                role :"admin"
            }
            return User.create(obj)
        })
        .then(data=>{
            //generate token hasil dari create admin
            token2 = generateToken({
                id : data.id,
                email : data.email
            })
            
            return Product.destroy({
                where : {}
            })
        })
        .then(()=>{
            done()
        })
        .catch(done)

    })

    it("should return response with status code 400",(done)=>{
        const body = {
            name : "aaaa",
            image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
            price : -1,
            stock : 5
        }
        request(app)
        .post('/products')
        .set('access_token', token2)
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




describe("testing admin /POST add tapi price diisi minus",()=>{
    let token2

    beforeAll((done)=>{
        User.destroy({
            where : {}
        })
        .then(()=>{
            let obj = {
                email : "admin@mail.com",
                password : "123456",
                role :"admin"
            }
            return User.create(obj)
        })
        .then(data=>{
            //generate token hasil dari create admin
            token2 = generateToken({
                id : data.id,
                email : data.email
            })
            
            return Product.destroy({
                where : {}
            })
        })
        .then(()=>{
            done()
        })
        .catch(done)

    })

    it("should return response with status code 400",(done)=>{
        const body = {
            name : "sepatu",
            image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
            price : 1000000,
            stock : -1
        }
        request(app)
        .post('/products')
        .set('access_token', token2)
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



describe("testing admin /POST add tapi stock diisi string",()=>{
    let token2

    beforeAll((done)=>{
        User.destroy({
            where : {}
        })
        .then(()=>{
            let obj = {
                email : "admin@mail.com",
                password : "123456",
                role :"admin"
            }
            return User.create(obj)
        })
        .then(data=>{
            //generate token hasil dari create admin
            token2 = generateToken({
                id : data.id,
                email : data.email
            })
            
            return Product.destroy({
                where : {}
            })
        })
        .then(()=>{
            done()
        })
        .catch(done)

    })

    it("should return response with status code 400",(done)=>{
        const body = {
            name : "sepatu",
            image_url : "https://s0.bukalapak.com/img/53971606541/large/data.png",
            price : 1000000,
            stock : "dua puluh",
            CategoryId: 1
        }
        request(app)
        .post('/products')
        .set('access_token', token2)
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