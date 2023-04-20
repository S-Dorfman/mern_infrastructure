//* Request handler Logic
//controllers/api/users.js

const User = require('../../models/user')
const jwt = require('jsonwebtoken')

async function create(req, res) {
    // console.log('[from Post handler]', req.body);
    // Try Catch: If we get a good request we will go within TRY and create a user, 
    // if there is an error we will go within CATCH, there will be a status code response of 400 and an error within the format of JSON
    try {
        //* creating a new user
        const user = await User.create(req.body);
        console.log(user);

        //* creating a new jwt
        jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'})


    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}




module.exports = {
    create
}