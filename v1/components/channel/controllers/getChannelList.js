const {Channel} = require(process.cwd() + "/models/index");

module.exports = async (req, res, next) => {
  
  const channels = await Channel.getAll(req.user.id)

  return res.status(200).json({response: channels})

};

