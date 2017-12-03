const path = require('path');

module.exports = {
    port: 3000,
    paths: {
        public: path.join(process.cwd(), '/public')
    },
	secret:   'mysecret',
    crypto: {
        hash: {
            length: 128,
            // may be slow(!): iterations = 12000 take ~60ms to generate strong password
            iterations: process.env.NODE_ENV == 'production'
                ? 12000
                : 1
        }
    }
}
