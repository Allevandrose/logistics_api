const Shipment = require('../models/Shipment');
const User = require('../models/User');

// Assign pickup or delivery agent to a shipment
exports.assignAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const { agentId, type } = req.body;

    // Find shipment
    const shipment = await Shipment.findById(id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    // Find agent
    const agent = await User.findById(agentId);
    if (!agent || !['agent'].includes(agent.role)) {
      return res.status(400).json({ message: 'Invalid agent' });
    }

    // Assign agent based on type
    if (type === 'pickup') {
      shipment.pickupAgent = agentId;
    } else if (type === 'delivery') {
      shipment.deliveryAgent = agentId;
    } else {
      return res.status(400).json({ message: 'Invalid agent type' });
    }

    // Save updated shipment
    await shipment.save();

    res.json({ message: 'Agent assigned successfully', shipment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};