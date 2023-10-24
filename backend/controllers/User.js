const customAPIError = require("../Errors/customError");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const SendResponseCookie = require("../utils/SendResponseCookie");
const DoesNotExist = require("../utils/DoesNotExist");
const SendMail = require("../utils/SendMail");
const Crypto = require("crypto");

// register controller
const Register = async (req, res) => {
  const { username, email, password, contact_details } = req.body;

  const { phone_no, region } = contact_details;

  // checking if we got all data
  if (!username || !email || !password || !phone_no || !region) {
    throw new customAPIError(
      "Please enter Username, contact details, Email and Password correctly.",
      StatusCodes.BAD_REQUEST
    );
  }

  // user created successfully
  const user = await User.create({
    username,
    contact_details,
    email,
    password_hash: password,
  });

  // now send a cookie to user with an accesstoken as a Response
  SendResponseCookie(user, res, StatusCodes.OK, "Registered Successfully !!");
};

// login controller
const Login = async (req, res) => {
  const { email, password } = req.body;

  // checking if we got all data
  if (!email || !password) {
    throw new customAPIError(
      "Please enter Email and Password correctly.",
      StatusCodes.BAD_REQUEST
    );
  }

  // checking that is user exists in DB
  const user = await User.findOne({ email }).select("+password_hash");
  if (!user) {
    throw new customAPIError("No user found with this Email !!");
  }

  // now check if user password is correct
  const isPassMatch = await user.bcryptComparePassword(password);
  if (!isPassMatch) {
    throw new customAPIError("Please enter a correct Password !!");
  }

  // now send a cookie to user with an accesstoken as a Response
  SendResponseCookie(user, res, StatusCodes.OK, "Logged In Successfully !!");
};

// logout controller
const LogOut = async (req, res) => {
  const cookieOptions = {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
  };

  res
    .status(StatusCodes.OK)
    .cookie("userToken", null, cookieOptions)
    .json({ success: true, msg: "Logged Out Successfully !!" });
};

// forgot pass controller
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  DoesNotExist(user, "User Not Found !!", StatusCodes.BAD_REQUEST);

  // getting and setting resetToken from user.method
  const resetToken = user.generateResetPasswordToken();
  await user.save();

  // creating reset password url using resetToken
  const url = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const mailText = `Your Password reset token is ${url} .\n\nIf you have not requested this mail please ignore it.`;
  const mailHTML = `
  <div
    style="    
    width: 70%;
    padding: 30px;
    background-color: lightcyan;
    "
  >
    <div>
      <h1 style="font-size: 2.5rem; font-family: cursive;">ResumeCraft</h1>
      <p style="font-size: 1.5rem;">
        Craft Your Future: Effortless Resume Building
      </p>
    </div>

    <div
      style="
        width: 100%;
        margin:15px 0px;
        display: flex;
        justify-content: center;
      "
    >
      <a
        href=${url}
        style="
          width: 400px;
          display:block;
          padding: 8px;
          font-size: 1.5rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          border-radius: 10px;
          background: lightgreen;
          color: black;
          border: transparent;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
            rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
          text-decoration: none;
          text-align: center;
        "
      >
        Reset Password
      </a>
    </div>
  </div>`;

  // send mail to this email
  try {
    await SendMail(email, mailText, mailHTML); // send mail

    return res.json({
      success: true,
      msg: "Mail Sent Successfully !!",
      resetToken,
    });
  } catch (error) {
    // if error occured then reset changed attributes in user and send response as an error
    console.log(error);

    user.User_Pass_Reset_Token = undefined;
    user.User_Pass_Reset_Token_Life = undefined;

    await user.save();

    // go to next middleware for error handling
    return next(
      new customAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

// reset pass controller
const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { new_Pass, confirm_Pass } = req.body;

  DoesNotExist(
    new_Pass && confirm_Pass,
    "Please Enter New Password and Confirm New Password",
    StatusCodes.BAD_REQUEST
  );

  // get resetToken and match it with user reset Token and find the user
  const userResetToken = Crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ userResetToken });

  const user = await User.findOne({
    User_Pass_Reset_Token: userResetToken,
    User_Pass_Reset_Token_Life: { $gt: Date.now() },
  });

  console.log({ user });

  DoesNotExist(
    user,
    "Invalid Password Reset token or token is Expired !!",
    StatusCodes.BAD_REQUEST
  );

  // now check that passwords entered by user are matched
  if (new_Pass !== confirm_Pass) {
    throw new customAPIError(
      "Passwords not matched !!",
      StatusCodes.BAD_REQUEST
    );
  }

  // set new Password to user DB
  user.password_hash = new_Pass;
  user.User_Pass_Reset_Token = undefined;
  user.User_Pass_Reset_Token_Life = undefined;

  await user.save();

  // response
  res.json({
    success: true,
    msg: "Password Reseted Successfully, Please login with new credentials !!",
  });
};

// load user
const LoadUser = async (req, res) => {
  res.json({ success: true, msg: "LoadUser Successfully !!", user: req.user });
};

// Add CareTakers
const AddCareTakers = async (req, res) => {
  res.json({ success: true, msg: "Added !!" });
};

module.exports = {
  Register,
  Login,
  LogOut,

  forgotPassword,
  resetPassword,

  LoadUser,
};
