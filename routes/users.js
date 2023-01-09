import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../util/verifyToken.js";
const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("HIiii user YOu are Logged In");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hi User/Admin You can delete your acc");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hi Admin ");
// });

//Delete
router.delete("/:id", verifyUser, deleteUser);
//Update
router.put("/:id", verifyUser, updateUser);
//get
router.get("/:id", verifyUser, getUser);
//get all
router.get("/", verifyAdmin, getAllUser);

export default router;
