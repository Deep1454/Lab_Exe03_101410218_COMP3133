const Restaurant = require("../models/Restaurants");

class RestaurantController {
  static async getAllRestaurants(req, res) {
    try {
      const restaurants = await Restaurant.find();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: "Error fetching restaurants", error });
    }
  }

  static async getRestaurantsByCuisine(req, res) {
    try {
      const cuisine = req.params.cuisine;
      const restaurants = await Restaurant.find({ cuisine: cuisine });
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: "Error fetching restaurants by cuisine", error });
    }
  }

  static async getRestaurantsSorted(req, res) {
    try {
      let sortOrder = req.query.sortBy === "DESC" ? -1 : 1;

      const restaurants = await Restaurant.find({})
        .sort({ restaurant_id: sortOrder });
  
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: "Error fetching sorted restaurants", error });
    }
  }
  

  static async getDelicatessenRestaurants(req, res) {
    try {
      const restaurants = await Restaurant.find({ cuisine: "Delicatessen", city: { $ne: "Brooklyn" } })
        .select("name cuisine city -_id")
        .sort({ name: 1 });

      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: "Error fetching Delicatessen restaurants", error });
    }
  }
}

module.exports = RestaurantController;
