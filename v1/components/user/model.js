const config = require("config");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const models = require(process.cwd() + "/models/index");

class User extends  Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init(
      {
        nickname: {
          type: DataTypes.STRING
        }
      },
      {
        modelName: "User",
        sequelize
      }
    )
  }

  static async getOne (body = {}){
    return await this
      .findOrCreate({
        where: body
      })
      .spread((user, created) => user)
  }

  generateAuthToken (id) {
    return jwt.sign({id}, config.get('jwtPrivateKey'));
  }
  
}

module.exports = User;
