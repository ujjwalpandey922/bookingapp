import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../util/error.js";
import jwt from "jsonwebtoken";
const saltRounds = 10;

export const registration = async (req, res, next) => {
  //to hash a password these two line
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("user Created Successfully");
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  //to hash a password these two line
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const loggedUser = await User.findOne({ userName: req.body.userName });
    if (!loggedUser) return next(createError(404, "User Not Found"));

    const isPassword = await bcrypt.compareSync(
      req.body.password,
      loggedUser.password
    );
    if (!isPassword) return next(createError(400, "Password Wrong"));

    const token = jwt.sign(
      { id: loggedUser._id, isAdmin: loggedUser.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...other } = loggedUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...other }, isAdmin });
  } catch (error) {
    next(error);
  }
};
