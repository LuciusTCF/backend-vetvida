const { request, response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const usersGet = async (req = request, res = response) => {
  const { limit = 15, from = 0 } = req.query;
  const [total, users] = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true }).limit(limit).skip(from),
  ]);
  res.status(200).json({
    total,
    users,
  });
};
const userPost = async (req = request, res = response) => {
  const { name, email, phone, password, pet, role } = req.body;
  const user = new User({ name, email, phone, password, pet, role });
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);
  await user.save();
  res.status(201).json({
    message: "Usuario creado",
    user,
  });
};
const userPut = async (req = request, res) => {
  const { id } = req.params;

  const { password, _id, email,item, ...rest } = req.body;

  let user = null;

  if(password){
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }
  if(item){
    user = await User.findByIdAndUpdate(
      id,
      { $push: { pet: item } },
      { new: true });
  }
  else{
    user = await User.findByIdAndUpdate(id, rest, { new: true });
  }

   

  res.status(200).json({
    message: "Usuario actualizado",
    user,
  });
};
const userDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const userDeleted = await User.findByIdAndUpdate(
    id,
    {
      state: false,
    },
    { new: true }
  );

  res.status(200).json({
    message: "Usuario eliminado",
    userDeleted,
  });
};

module.exports = {
  usersGet,
  userPost,
  userPut,
  userDelete,
};
