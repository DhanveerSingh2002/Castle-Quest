const express = require('express');
const { test, updateUserInfo, deleteUser, getListings, getUser } = require('../controllers/User.controller');
const {verifyToken} = require('../utils/verifyUser.js');

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUserInfo);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getListings);
router.get('/:id', verifyToken, getUser);

module.exports = router;