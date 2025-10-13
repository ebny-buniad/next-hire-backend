const { createUser, getUserByEmail, updateProfilePic, deleteUserProfile } = require("../controllers/userControler");
const express = require('express')
const router = express.Router();

router.post('/', createUser);
router.get('/', getUserByEmail);
router.put('/', updateProfilePic);
router.delete('/', deleteUserProfile);

module.exports = router;