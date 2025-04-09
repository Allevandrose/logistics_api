const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deliveryAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      description: { type: String, required: true },
      weight: { type: String, required: true },
    },
  ],
  status: {
    type: String,
    enum: ['created', 'received', 'in_transit', 'out_for_delivery', 'delivered'],
    default: 'created',
  },
  payment: {
    status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
    amount: { type: Number, required: true },
  },
}, { timestamps: true });

module.exports = mongoose.model('Shipment', shipmentSchema);