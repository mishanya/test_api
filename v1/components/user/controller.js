const Joi = require('joi');
const User = require(process.cwd() + "/models/index").User;
const config = require('config');
 
module.exports = async (req, res) => {

    const {error} = validate(req.body);

    if (error) {
    	return res.status(400).json({
		    	error: error.details[0].message
		    });
	 }

    const user = await User.getOne({nickname: req.body.nickname})
    const token = user.generateAuthToken(user.id)

    const date = new Date()
    date.setFullYear(date.getFullYear() + 1)

    res
    .status(200)
    .cookie(
      'token', token, {
        expires: date,
        domain: config.get('domain'),
        hostOnly: false
      }
    )
    .json({response: {
    	nickname: user.nickname
    }})   
};

function validate(req) {
  const schema = {
    nickname: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}


