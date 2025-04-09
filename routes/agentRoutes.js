const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const agentController = require('../controllers/agentController');

// Assign agent to shipment (Admin)
router.put('/:id/assign-agent', authMiddleware, roleMiddleware(['admin']), agentController.assignAgent);

module.exports = router;