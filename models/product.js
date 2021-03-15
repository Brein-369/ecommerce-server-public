'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name:{
      type :  DataTypes.STRING,
      validate :{
        notEmpty : {
          args : true,
          msg : "name is required"
        }
      }

    },
    image_url: {
      type : DataTypes.STRING,
      validate :{
        notEmpty : {
          args : true,
          msg : "image_url is required"
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      validate :{
        min : {
          args : 1,
          msg : "price minimal 1"
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate :{
        min : {
          args : 1,
          msg : "stock minimal 1"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};