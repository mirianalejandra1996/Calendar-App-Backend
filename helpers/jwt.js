const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    // If the token has been manipulated before is not going be invalid
    return new Promise ( (resolve, reject ) => {
        
        const payload = {uid, name}

        // Second parameter is the "secret" of "private key"
        // Third parameter options that set token duration
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        },(err, token) => {

            if (err) {
                console.log('error', err)
                reject('Failed to generate token')
            }

            resolve(token)
        });
    } )
}

module.exports = {
    generateJWT
}