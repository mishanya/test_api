const fetch = require('node-fetch');
const config = require('config');
const VKKey = config.get('VKKey');

module.exports = async (id, offset = 0, limit = 8) => {
	return await fetch(`https://api.vk.com/method/photos.get?owner_id=-${id}&offset=${offset}&limit=${limit}&rev=1&access_token=${VKKey}&album_id=wall&count=7&v=5.31`)
	.then(res => res.json())
	.then(res =>  {
 		return res.response && {
			items: res.response.items,
			lastPage: res.response.count <= ((offset || 1) + limit)
		}
	})
}