const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const models = require(process.cwd() + "/models/index");

class Channel extends  Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING
        },
        title: {
          type: DataTypes.STRING
        },
        avatar: {
          type: DataTypes.STRING
        },
        user_id: {
          type: DataTypes.INTEGER
        },
        vk_id: {
          type: DataTypes.INTEGER

        }
      },
      {
        modelName: "Channel",
        sequelize
      }
    )
  }

  static async getOne (name, userId){
    return await this
      .findOne({
        where: {
          name,
          user_id: userId
        }
      })
  }

  static async setOne (body = {}){
    return await this
      .findOrCreate({
        where: {
          vk_id: body.vk_id,
          user_id: body.user_id
        },
        defaults: body
      })
      .spread((channel, created) => created && channel)
  }

  static async getAll (userId){
    return await this
      .findAll({
        where: {user_id: userId},
      })
  }
 
}

module.exports = Channel;
