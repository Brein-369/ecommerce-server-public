'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart)

    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      unique : {
        msg : "Email Should be Unique"
      },
      validate : {
        notEmpty : {
          msg : "Email should not be empty"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        len :{
          args : [6],
          msg : "Password should be minimal 6 characters"
        },
        notEmpty : {
          msg : "Password should not be empty"
        }
      }
    },
    role: DataTypes.STRING,
    address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      validate:{
        isNumeric: {
          args: true,
          msg : "Phone should be in number"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, options)=>{
    instance.password = hashPassword(instance.password)
  })

  return User;
};