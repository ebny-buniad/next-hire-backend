const express = require('express');
const { createCompanyProfile, getCompanyProfile } = require('../controllers/companyProfileControler');
const router = express.Router();

router.post('/', createCompanyProfile);
router.get('/', getCompanyProfile);

module.exports = router;