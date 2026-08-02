const RoutePlanner = require('../models/routeplannerModel');

exports.saveRoute = async (req, res) => {
  try {
    const { startLocation, destination, waypoints, routeName, distance, time } = req.body;

    const newRoute = new RoutePlanner({
      startLocation,
      destination,
      waypoints,
      routeName,
      distance,
      time
    });

    const savedRoute = await newRoute.save();
    res.status(201).json({ message: 'Route saved successfully!', data: savedRoute });
  } catch (error) {
    res.status(500).json({ message: 'Error saving route', error: error.message });
  }
};