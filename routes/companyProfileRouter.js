const express = require('express');
const { createCompanyProfile, getCompanyProfile, deleteCompanyProfile } = require('../controllers/companyProfileControler');
const router = express.Router();

router.post('/', createCompanyProfile);
router.get('/', getCompanyProfile);
router.delete('/', deleteCompanyProfile);

module.exports = router;