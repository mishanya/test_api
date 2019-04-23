const {User} = require(process.cwd() + '/models/index');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async  (req, res, next) => {

	const token = req.cookies.token

  try {

    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(403).clearCookie('token').json({error: 'Access denied. Invalid auth token.'});
    }

    req.user = user;
    next();
  }
  catch (ex) {
    return res.status(403).clearCookie('token').json({error: 'Access denied. Invalid auth token.'});
  }

}
