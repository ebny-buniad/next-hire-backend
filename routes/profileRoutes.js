const express = require('express');
const { createProfile, getProfile, updateProfile } = require('../controllers/profileControler');
const router = express.Router();

router.post('/', createProfile);
router.get('/', getProfile);
router.put('/', updateProfile);

module.exports = router;