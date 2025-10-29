const express = require('express');
const { createJob, getAlljobs, getAllJobs } = require('../controllers/jobControler');
const router = express.Router();

router.post('/', createJob);
router.get('/', getAllJobs)


module.exports = router