const express = require('express');
const { test } = require('../controllers/User.controller');

const router = express.Router();

router.get('/api', test);

module.exports = router;