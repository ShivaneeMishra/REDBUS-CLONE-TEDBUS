const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  startLocation: { type: String, required: true },
  destination: { type: String, required: true },
  waypoints: { type: [String], default: [] },
  routeName: { type: String, required: true },
  distance: { type: String, required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RoutePlanner', routeSchema);