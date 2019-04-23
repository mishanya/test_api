const  {addChannelByName, getChannelFeed, getChannelList}   = require('./controller');
const checkToken = require('./helpers/checkToken')
const router =  require('express').Router();

router.get('', checkToken, getChannelList);
router.post('/:name', checkToken, addChannelByName);
router.get('/:name', checkToken, getChannelFeed);

module.exports = router

 
 