const express = require('express');
const { signUp, signIn, googleSignIn, signOut } = require('../controllers/Auth.controller.js');

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/google', googleSignIn);
router.get('/sign-out', signOut);

module.exports = router;