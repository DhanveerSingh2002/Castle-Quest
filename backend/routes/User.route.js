const express = require('express');
const { test, updateUserInfo, deleteUser, getListings } = require('../controllers/User.controller');
const {verifyToken} = require('../utils/verifyUser.js');

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUserInfo);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getListings);

module.exports = router;