const express = require('express');
const router = express.Router();
const usersApicontroller = require('../../controller/api/usersApi');

// /api/users
router.get('/', usersApicontroller.index)

// /api/users/login
router.get('/',() => {});

// api/users/signup
router.post('signup/',usersApicontroller.signup);

module.exports = router;