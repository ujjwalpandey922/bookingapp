import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRoom,
  getRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../util/verifyToken.js";
const router = express.Router();

//Create
router.post("/:hotelid", verifyAdmin, createRoom);
//Delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//Update
router.put("/:id", verifyAdmin, updateRoom);
//availibility of rooms
router.put("/availableRooms/:id", updateRoomAvailability);
//get
router.get("/:id", getRoom);
//get all
router.get("/", getAllRoom);

export default router;
