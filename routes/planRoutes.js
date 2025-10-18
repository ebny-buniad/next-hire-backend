const express = require("express");
const { createPlan, getPlan, deletePlan } = require("../controllers/planControler");
const router = express.Router();

router.post('/', createPlan);
router.get('/:role', getPlan);
router.delete('/:id', deletePlan);

module.exports = router;