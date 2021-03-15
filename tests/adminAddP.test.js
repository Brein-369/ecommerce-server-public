const request = require("supertest")
const app = require('../app')
const {User} = require('../models')
const {generateToken} = require('../helpers/jwt')

describe("testing admin /POST login",()=>{

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
            done()
            console.log(data, "masuk create admin success <<<<<<<<<<<<<<<");

            //generate token hasil dari create obj
            token = generateToken({
                id : data.id,
                email : data.email
            })
            
        })
        .catch(done)
    })


    
    it("should return response with status code 200",(done)=>{
        const body = {
            email : "admin@mail.com",
            password : "123456"
        }
        request(app)
        .post('/login')
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
                expect(res.body).toHaveProperty("email")    
                expect(typeof res.body.email).toEqual("string")
                expect(res.body).toHaveProperty("access_token")
                done()
            }
        })
    })


    // email ada password salah
    it("should return response with status code 401",(done)=>{
        const body = {
            email : "admin@mail.com",
            password : "12345666666"
        }
        request(app)
        .post('/login')
        .send(body)
        .end((err,res)=>{
            if(err){
                done(err)
            }
            else{
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("message", "Authorization Error")
                expect(res.body).toHaveProperty("detail", 'Invalid Email or Password')
                done()
            }

        })
    })

    //email tidak ada di db
    it("should return response with status code 401",(done)=>{
        const body = {
            email : "adminnnnnnnn@mail.com",
            password : "123456"
        }
        request(app)
        .post('/login')
        .send(body)
        .end((err,res)=>{
            if(err){
                done(err)
            }
            else{
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("message", "Authorization Error")
                expect(res.body).toHaveProperty("detail", 'Invalid Email or Password')
                done()
            }

        })
    })

    //tidak memasukan email dan password
    it("should return response with status code 400",(done)=>{
        const body = {
            email : "",
            password : ""
        }
        request(app)
        .post('/login')
        .send(body)
        .end((err,res)=>{
            if(err){
                done(err)
            }
            else{
                //kok ga masuk validasi sequelize validation error...
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("theErr")
                expect(res.body.theErr).toEqual(expect.arrayContaining(['Email should not be empty']))
                done()
            }

        })
    })

})


