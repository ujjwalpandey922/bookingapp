import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const getHotel = async (req, res, next) => {
  try {
    const foundHotel = await Hotel.findById(req.params.id);
    res.status(200).json(foundHotel);
  } catch (error) {
    next(error);
  }
};
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body); //request from user ie req.body
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel Deleted");
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } //to show current update
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};
export const getAllHotel = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const foundHotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 10000 },
    }).limit(req.query.limit);
    res.status(200).json(foundHotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  // to get any query from user
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((e) => {
        // find({city:e}).length use this but will fetxh all data
        return Hotel.countDocuments({ city: e }); // only returns the count ;;; FASTER
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelType = await Hotel.countDocuments({ type: "hotel" });
    const apartmentType = await Hotel.countDocuments({ type: "apartment" });
    const villaType = await Hotel.countDocuments({ type: "villa" });
    const resortType = await Hotel.countDocuments({ type: "resort" });
    const cabinType = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelType },
      { type: "apartment", count: apartmentType },
      { type: "villa", count: villaType },
      { type: "resort", count: resortType },
      { type: "cabin", count: cabinType },
    ]);
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room_element) => Room.findById(room_element))
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
