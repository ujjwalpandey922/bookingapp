import User from "../models/User.js";

// getUser
export const getUser = async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.status(200).json(foundUser);
  } catch (error) {
    next(error);
  }
};
// deleteUser
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Deleted");
  } catch (error) {
    next(error);
  }
};
// updateUser
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } //to show current update
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
// getAllUser
export const getAllUser = async (req, res, next) => {
  try {
    const foundUsers = await User.find();
    res.status(200).json(foundUsers);
  } catch (error) {
    next(error);
  }
};
