const { request } = require('express');
const {response} = require ('express');
const jwt = require('jsonwebtoken');
const  User  = require('../models/user');


const validateJWT = async (req = request, res = response, next)=>{
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg:"No se reconoce el token"
        })
    }

    try {
        const { uid } = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        if(!user){
            return res.status(401).json({
                msg:"El token no se encuentra vigente"
            })
        }

        if(!user.state){
            return res.status(401).json({
                msg:"El token no se encuentra vigente"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg:"El token no se encuentra vigente"
        })
    }

}


module.exports = { validateJWT };