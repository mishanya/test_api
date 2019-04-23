const Joi = require('joi');
const {Channel} = require(process.cwd() + "/models/index");
const findChannel = require('./../helpers/findChannel');

module.exports = async (req, res, next) => {
  
  const {error} = validate(req.params);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  const channel = await findChannel(req.params.name)

  if (!channel) {
    return res.status(404).json({error: 'Not found or not a group'});
  }

  return await Channel.setOne({
    vk_id: channel.id,
    user_id: req.user.id,
    name: channel.screen_name,
    title: channel.name,
    avatar: channel.photo_100
  })
  .then(channel => channel
    ? res.status(200).json({response: channel})
    : res.status(409).json({error: 'Already subscribed'})
  )
};

function validate(req) {
  const schema = {
    name: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(req, schema);
};