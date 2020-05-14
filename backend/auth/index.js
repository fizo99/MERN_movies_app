const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

require('dotenv').config({path: __dirname + '/./../.env'});

const db = require('../db/connection');

const router = express.Router();

const users = db.get('users');
users.createIndex('username', { unique: true } );

const schema = Joi.object().keys({
    //alphanumercis signs, 2-30 signs, required
    username: Joi.string().alphanum().min(2).max(30).required(),
    //6-x signs, required , no white spaces
    password: Joi.string().min(6).required().trim()
})

// registration
router.post('/signup', (req,res,next) => {
    const result = Joi.validate(req.body, schema);
    if(result.error === null){
        users.findOne({
            username: req.body.username
        })
        .then(user => {
            if(user){
                //send error (user exists)
                res.status(409).send({
                    message: "That username is already taken"
                });
            }else{
                // hash password and insert into DB
                bcrypt.hash(req.body.password, 12)
                 .then(hashedPassword => {
                    const newUser = {
                         username: req.body.username,
                         password: hashedPassword
                     };

                    users.insert(newUser)
                     .then(insertedUser => {
                        delete insertedUser.password;
                        res.json({insertedUser})
                     })
                 })
            }
        })
    }else{
        res.json(result);
    }
})


router.post('/login', (req,res,next) => {
    const result = Joi.validate(req.body, schema);
    if(result.error == null){
        users.findOne({
            username: req.body.username
        }).then(user => {
            if(user){
                //check password
                bcrypt
                 .compare(req.body.password, user.password)
                 .then((result) => {
                    if(result){
                        const payload = {
                            _id: user._id,
                            username: user.username
                        };
                        jwt.sign(payload, process.env.TOKEN_SECRET, {
                             expiresIn: '1d'
                        },(err, token) => {
                            if(err){
                                res.status(422).send({
                                    message: "Token error"
                                });
                            }else{
                                res.json({token})
                            }
                        })
                    }else{
                        res.status(422).send({
                            message: "Data not valid"
                        });
                    }
                 })
            }else{
                res.status(422).send({
                    message: "Data not valid"
                });
            }
        })
    }else{
        res.status(422).send({
            message: "Data not valid"
        });
    }
})


module.exports = router;