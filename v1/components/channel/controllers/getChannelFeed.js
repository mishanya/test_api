const Joi = require('joi');
const {Channel} = require(process.cwd() + "/models/index");
const getChannelFeed = require('./../helpers/getChannelFeed');

module.exports = async (req, res, next) => {
  
  const {error} = validate(req.params, 'params') || validate(req.query, 'query');

  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  const channel = await Channel.getOne(req.params.name, req.user.id)

  if (!channel) {
    return res.status(404).json({error: 'Not found or not subscribed'})
  }

  let feed = await getChannelFeed(channel.vk_id, Number(req.query.offset));

  if (!feed){
    return res.status(400).json({error: 'An error occured : ('})
  }

  feed.items = feed.items.map(entry =>  entry.photo_604)
  feed.title = channel.title

  return res.status(200).json({response: feed})

};

function validate(req, schemaName) {
  const schemas ={
    'params': {
      name: Joi.string().min(3).max(255).required(),
    },
    'query': {
      offset: Joi.number().integer().min(0),
    }
  }

  return Joi.validate(req, schemas[schemaName]);
}