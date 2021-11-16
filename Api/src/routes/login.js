const express = require("express");
const path = require('path');
const passport = require('passport');

const parentFolder = path.resolve(__dirname, '..')
const userController = require(path.join(parentFolder,  '/util', 'userController.js'))
const auth = require(path.join(parentFolder,  '/util', 'auth.js'))

const router = express.Router();

router.post('/login', (req, res) =>{
    user = req.body

    if(!user){
        return res.status(401).json({message: 'Missing data'})
    }
    if(!user.id || !user.password){
        return res.status(401).json({message: 'Missing data'})
    }

    userController.checkCredentials(user.id, user.password, (err, result) =>{
        if(!result){
            return res.status(401).json({message: 'Invalid credentials'})
        }
        auth.sign(user, 'password', '120s', (err, token) => {
            res.status(200).json({token})
        })
    })
});

router.post('/register', (req, res) =>{
    userController.registerUser(req.body, res.status(200).json({message: 'User added'}))
});

router.get('/radio/usersAuth', auth.verifyToken, (req, res) =>{
    auth.verify(req.token, 'password', (err, auth) => {
        if(err){
            res.status(403).json({msg: 'Sin autorizacion (route)'})
        }
        else{
            res.status(200).json({
                msg: 'Autorizado',
                auth
            })
        }
    })
});

module.exports = router