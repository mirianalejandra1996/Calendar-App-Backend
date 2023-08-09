// Esto se importa de nuevo para que aparezca el intellisence de nuevo
const { response } = require("express");
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");


// const createUser = (req, res = express.response) => {
const createUser = async (req, res = response) => {
  // const createUser = (req, res) => {

  const { name, email, password } = req.body;

  try {

    let user = await User.findOne({email})

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exist'
      })
    }
  
  user = new User(req.body)

  // Encrypt password
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt)

  await user.save()

  // Generate a token
  const token = await generateJWT(user.uid, user.name)

  res.status(201).json({
    ok: true,
    uid: user.id,
    name: user.name,
    token,
    // user: req.body
    // name,
    // email,
    // password,
  });
  } catch (error) {
    console.log('error')
    res.status(500).json({
      ok: false,
      msg: 'Please contact with the admin'
    })
  }
  
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email})

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'User does not exist with this email'
      })
    }

  // Confirm and check password
  const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid password'
      })
    }

    // Generate a token
    const token = await generateJWT(user.id, user.name)

  res.json({
    ok: true,
    uid: user.id,
    name: user.name,
    token,
  });
    
  } catch (error) {
    console.log('error')
    res.status(500).json({
      ok: false,
      msg: 'Please contact with the admin'
    })
  }
};

const revalidateToken = async (req, res = response) => {

  const {uid, name} = req
  
  // Generate a token
  const token = await generateJWT(uid, name)

  res.json({
    ok: true,
    token,
    uid,
    name,
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
