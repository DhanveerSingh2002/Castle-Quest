const express = require('express');
const { test, updateUserInfo } = require('../controllers/User.controller');
const {verifyToken} = require('../utils/verifyUser.js');

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUserInfo);

module.exports = router;