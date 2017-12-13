const path = require('path');

module.exports = {
	port: 3000,
	paths: {
		public: path.join(process.cwd(), '/public')
	},
	keys: 'mysecret',
	crypto: {
		hash: {
			length: 128,
			iterations: 12000
		},
		algorithm: 'sha256'
	},
	mailer: {
		host: 'smtp.yandex.ru',
		port: 465,
		auth: {
			user: 'chopa@yandex.ru',
			pass: '1899dist3802Idya'
		}
	}

}
