const { createUser, getUserByEmail } = require("../controllers/userControler");
const express = require('express')
const router = express.Router();

router.post('/', createUser);
router.get('/', getUserByEmail);

module.exports = router;