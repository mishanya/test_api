const fetch = require('node-fetch');
const config = require('config');
const VKKey = config.get('VKKey');

module.exports = async (screenName) => {

  return await fetch(`https://api.vk.com/method/groups.getById?group_id=${screenName}&access_token=${VKKey}&v=5.31`)
    .then(res => res.json())
    .then(res => res.response && res.response[0]);
}