const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require('./../config/config.json')[env];
const  sequelize = new Sequelize(config.database, config.username, config.password, config);


const User = require("./../v1/components/user/model");
const Channel = require("./../v1/components/channel/model");

const models = {
  User: User.init(sequelize, Sequelize),
  Channel: Channel.init(sequelize, Sequelize)
  /*Third: ThirdModel.init(sequelize, Sequelize)*/
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize
};

module.exports = db;