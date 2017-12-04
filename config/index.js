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
	}

}
