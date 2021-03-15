const bcrypt = require('bcrypt')

const hashPassword = (password)=>{
    return bcrypt.hashSync(password, 10)
}

const comparePassword = (inputPass, hashPass)=>{
    return bcrypt.compareSync(inputPass, hashPass)
}

module.exports = {
    hashPassword,
    comparePassword
}