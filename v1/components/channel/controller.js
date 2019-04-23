const getChannelList = require('./controllers/getChannelList');
const addChannelByName = require('./controllers/addChannelByName');
const getChannelFeed = require('./controllers/getChannelFeed');

module.exports = {
  getChannelList,
  addChannelByName,
  getChannelFeed
}