const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const shipmentController = require('../controllers/shipmentController');

// Create a shipment (Client)
router.post('/', authMiddleware, shipmentController.createShipment);

// Update shipment status (Staff/Agent)
router.put('/:id/status', authMiddleware, roleMiddleware(['admin', 'agent']), shipmentController.updateStatus);

module.exports = router;