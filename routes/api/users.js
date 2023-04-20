//* Routing Logic 
// routes/api/users.js

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

//*POST method to receive form data
router.post('/', usersCtrl.create);

module.exports = router; 