const jwt = require("jsonwebtoken");

function sign(user, password, expiration, cb){

    if(typeof expiration === 'function'){
        jwt.sign({user}, password, expiration)
    }
    else{
        jwt.sign({user}, password, {expiresIn: expiration} , cb)
    }
}

function verify(token, password, cb){
    jwt.verify(token, password, cb)
}

function verifyToken(req, res, next){
    const bearerHeader = req.headers['auth'];

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }
    else{
        res.status(403).json({msg: 'Sin autorizacion (auth)'})
    }
}

module.exports = {sign, verify, verifyToken}