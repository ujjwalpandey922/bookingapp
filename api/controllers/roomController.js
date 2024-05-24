import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).send("Room Deleted");
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } //to show current update
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
    // updateOne because not changing the whole room just one room availability
    await Room.updateOne(
      { "roomNumber._id": req.params.id },
      {
        // to go deep in nested rooms key.$.otherKey
        $push: { "roomNumber.$.unavailableDates": req.body.dates },
      }
    );
    res.status(200).json("Rooms Updated.....!!!!");
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const foundRoom = await Room.findById(req.params.id);
    res.status(200).json(foundRoom);
  } catch (error) {
    next(error);
  }
};
export const getAllRoom = async (req, res, next) => {
  try {
    const foundAllRooms = await Room.find();
    res.status(200).json(foundAllRooms);
  } catch (error) {
    next(error);
  }
};
