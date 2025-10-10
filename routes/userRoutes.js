const { createUser, getUserByEmail, updateProfilePic } = require("../controllers/userControler");
const express = require('express')
const router = express.Router();

router.post('/', createUser);
router.get('/', getUserByEmail);
router.put('/', updateProfilePic);

module.exports = router;