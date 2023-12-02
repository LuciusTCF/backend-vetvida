
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
// const jwt = require('jsonwebtoken');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "El correo ó la contraseña  son incorrectos"
            })
        }

        if (!user.state) {
            return res.status(400).json({
                msg: "Usuario suspendido"
            })
        }

        const validatePass = bcryptjs.compareSync(password, user.password);
        if (!validatePass) {
            return res.status(400).json({
                msg: "El correo ó la contraseña  son incorrectos"
            })
        }


    const token = await generateJWT(user.id);
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Comuníquese con el administrador ⚠️",
    });
  }
};


const getId = (req = request, res = response) => {
    const { id, role } = req.user;

    res.json({
        id,
        role,
    });
};



module.exports = { login, getId } 