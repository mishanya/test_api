var router = require('express').Router();
const userRouter	= require('./components/user/routes');
const channelRouter = require('./components/channel/routes');
//const middlewareRouter = require('./middleware/routes');
// split up route handling
 
// etc.
router.use('/user', userRouter)
router.use('/channel',  channelRouter);
router.use('*', (req, res) => res.status(404).json({error: 'Not found'}))
 
module.exports = router;   