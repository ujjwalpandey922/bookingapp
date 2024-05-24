import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  getRooms,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../util/verifyToken.js";
const router = express.Router();

//Create
router.post("/", verifyAdmin, createHotel);
//Delete
router.delete("/:id", verifyAdmin, deleteHotel);
//Update
router.put("/:id", verifyAdmin, updateHotel);
//get
router.get("/find/:id", getHotel);
//get all
router.get("/", getAllHotel);
//get by City
router.get("/countByCity", countByCity);
//get by Type
router.get("/countByType", countByType);
//get rooms
router.get("/getrooms/:id", getRooms);

export default router;
