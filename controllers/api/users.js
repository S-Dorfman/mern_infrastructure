//* Request handler Logic
//controllers/api/users.js

//? controller page to convert password to encrypted string
//jwt token = string to verify user is who they say they are
//bcrypt = package to encrypt password

const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//* --- Helper function ---
function createJWT(user) {
    return jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'})       
}

async function create(req, res) {
    // console.log('[from Post handler]', req.body);
    // Try Catch: If we get a good request we will go within TRY and create a user, 
    // if there is an error we will go within CATCH, there will be a status code response of 400 and an error within the format of JSON
    try {
        // creating a new user
        const user = await User.create(req.body);
        console.log(user);

        // creating a new jwt
        const token = createJWT(user);
        
        // we can use res.json to send back just a string
        res.json(token);

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}


async function login(req, res) {
    try {
        // find user in db
      const user = await User.findOne({ email: req.body.email });
      // check if we found an user
      if (!user) throw new Error();
      // compare the password to hashed password
      const match = await bcrypt.compare(req.body.password, user.password);
      // check is password matched
      if (!match) throw new Error();
      // send back a new token with the user data in the payload
      res.json( createJWT(user) );
    } catch {
      res.status(400).json('Bad Credentials');
    }
  }


  async function checkToken(req, res) {
    console.log(req.user);
    res.json(req.exp)
}

module.exports = {
    create,
    login,
    checkToken
}