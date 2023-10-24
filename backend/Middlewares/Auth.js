const customAPIError = require("../Errors/customError");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const isAuthRoute = async (req, res, next) => {
  const { userToken } = req.cookies;

  // console.log({ userToken });

  if (!userToken) {
    throw new customAPIError("Please Login to access this route.");
  }

  const JWT_Info = JWT.verify(userToken, process.env.JWT_SECRET);

  const user = await User.findById(JWT_Info.userID);

  req.user = user;

  next();
};

const authRole = (role) => {
  return (req, res, next) => {
    // console.log({ role });

    if (role !== req.user.role) {
      throw new customAPIError(
        "You are not authorized to access this route !!",
        StatusCodes.UNAUTHORIZED
      );
    }

    next();
  };
};

module.exports = {
  isAuthRoute,
  authRole,
};
