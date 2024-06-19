const express = require('express');
const { test, updateUserInfo, deleteUser } = require('../controllers/User.controller');
const {verifyToken} = require('../utils/verifyUser.js');

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUserInfo);
router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;