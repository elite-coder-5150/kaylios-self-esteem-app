const express = require('express');
const { createUser } = require('../controllers/users.controller');
const router = express.Router();
const validateUser = require('../middleware/validate')

router.post('/register', validateUser, createUser)

module.exports = router;