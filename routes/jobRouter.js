const express = require('express');
const { createJob, getAllJobs, getJobDetails } = require('../controllers/jobControler');
const router = express.Router();

router.post('/', createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobDetails);


module.exports = router