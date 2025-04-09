const Shipment = require('../models/Shipment');
const User = require('../models/User');
const sendWhatsApp = require('../utils/whatsapp');

// Create a shipment
exports.createShipment = async (req, res) => {
  try {
    const { items, pickupLocation, destination } = req.body;

    // Generate tracking number
    const trackingNumber = `SHIP-${Date.now()}`;

    // Create new shipment
    const shipment = new Shipment({
      trackingNumber,
      client: req.user._id,
      items,
      pickupLocation,
      destination,
      status: 'created',
    });
    await shipment.save();

    // Send WhatsApp notification to client
    sendWhatsApp(req.user.phone, `Your shipment has been created. Tracking Number: ${trackingNumber}`);

    res.status(201).json({ message: 'Shipment created successfully', shipment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update shipment status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Update shipment status
    const shipment = await Shipment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    // Send WhatsApp notification to client
    const client = await User.findById(shipment.client);
    let message = '';
    if (status === 'received') {
      message = `Your shipment ${shipment.trackingNumber} has been received at our warehouse.`;
    } else if (status === 'in_transit') {
      message = `Your shipment ${shipment.trackingNumber} is now in transit to your destination.`;
    } else if (status === 'out_for_delivery') {
      message = `Your shipment ${shipment.trackingNumber} will be delivered today. Please be available.`;
    } else if (status === 'delivered') {
      message = `Your shipment ${shipment.trackingNumber} has been successfully delivered. Thank you!`;
    }

    if (message && client.phone) {
      sendWhatsApp(client.phone, message);
    }

    res.json({ message: 'Shipment status updated successfully', shipment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};