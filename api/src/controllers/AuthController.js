require('dotenv').config()
const { User} = require('../models')
const jwt = require('jsonwebtoken');
const crypto = require("crypto")
const bcrypt = require('bcrypt');
const moment = require("moment")
// -- Functions -- //
// jwt token

function jwtSignUser(user) {
    const secretKey = process.env.JWT_SECRET
    //We generate the secretKey
    const token = jwt.sign({
        username: user.email,
        firstname: user.first_name,
        lastname: user.last_name
    },
    secretKey,{
        expiresIn: "24h"
    })
    if(token){
        // We create the hash sha256 using the TOKEN_KEY
        const sha256Hasher = crypto.createHmac("sha256",process.env.JWT_SECRET);
        if(sha256Hasher){
            //We hash our token
            const tokenHashed = sha256Hasher.update(token).digest("hex");
            user = User.update({
                token: tokenHashed
            }, {
                where: {
                    email: user.email,
                }
            })
            if(user){
                return token
            }
        }
    }
}

module.exports = {
    async register(req,res){
        const {email,password,firstname,lastname} = req.body;
        try{
            const fetchUser = await User.findOne({
                where: {
                    email: email
                }
            })
            if(!fetchUser){
                const user = await User.create({
                    email: email,
                    password: password,
                    firstname: firstname,
                    lastname: lastname
                })
                if(user){
                    const token = jwtSignUser(user.toJSON());
                    global.token = token;
                    res.status(200).send({
                        token: token,
                        message: "Votre compte a été créé !"
                    })
                }
                else{
                    res.status(500).send({
                        message: "Une erreur interne est survenue. Veuillez réessayer."
                    })
                }
            }  
            else{
                res.status(500).send({
                    message: "Cet email existe déjà. Veuillez en utiliser un autre"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer."
            })
        }
    },
    async login(req,res){
        try{
            const token = global.token;
            const {email,password} = req.body;
            const user = await User.findOne({
                where: {
                    email: email,
                }
            })
            if(!user){
                res.status(404).send({
                    message: "L'utilisateur n'a pas été trouvé. Veuillez réessayer"
                });
            }
            else{
                await user.comparePassword(password).then(isMatch => {
                    if(!isMatch){
                        res.status(404).send({
                            message: "L'utilisateur n'a pas été trouvé. Veuillez réessayer"
                        });
                    }
                    else{
                        const userJson = user.toJSON();
                        const token = jswtSignUser(userJson);
                        global.token = token;

                        res.status(200).send({
                            token: token,
                            message: "Vos identificants sont corrects"
                        });
                    }
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer."
            })
        }
    },
    
    async logout(req,res){
        try{
            const token = global.token;
            const user = await User.findOne({
                where: {
                    token: token
                }
            })
            if(user){
                const userJson = user.toJSON();
                await User.update({
                    token: jwtSignUser(userJson)
                },
                {
                    where: {
                        id_user: userJson.id_user
                    }
                }).then(()=> {
                    res.status(200).send({
                        message: "L'utilisateur a été déconnecté"
                    })
                }) 
            }
            else{
                res.status(404).send({
                    message: "L'utilisateur n'a pas été trouvé"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer"
            })
        }
    }
}

