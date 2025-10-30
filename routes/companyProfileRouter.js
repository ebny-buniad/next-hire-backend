const express = require('express');
const { createCompanyProfile, getCompanyProfile, deleteCompanyProfile, updateCompanyProfile, } = require('../controllers/companyProfileControler');
const router = express.Router();

router.post('/', createCompanyProfile);
router.get('/', getCompanyProfile);
router.delete('/', deleteCompanyProfile);
router.put('/', updateCompanyProfile);

module.exports = router;