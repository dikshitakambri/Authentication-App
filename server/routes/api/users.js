const express = require('express');
const router = express.Router();

// /api/users
router.get('/',(req, res) => {
    return res.status(200).json({
        success: true
    })
});

// /api/users/login
router.get('/',() => {});

// api/users/signup
router.get('/',() => {})

module.exports = router;