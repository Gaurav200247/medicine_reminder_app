const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const Crypto = require("crypto");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [6, "Username is too short (min 6 letters)"],
      unique: [true, "Username already taken."],
    },

    contact_details: {
      phone_no: {
        type: Number,
        required: true,
        maxlength: [10, "Please provide a valid phone_no."],
      },
      region: { type: String, required: true },
    },

    email: {
      type: String,
      required: true,
      unique: [true, "Email already taken."],
      validate: [validator.isEmail, "Please Enter a Valid Email"],
    },

    password_hash: {
      type: String,
      required: true,
      minlength: [8, "Password is too short (min 8 letters)"],
      select: false, // means when we get user we cannot get user's password
    },

    role: { type: String, required: true, default: "user" },

    CareTakers: [
      {
        email: {
          type: String,
          required: true,
          validate: [validator.isEmail, "Please Enter a Valid Email"],
        },
        phone_no: { type: Number, required: true },
      },
    ],

    User_Pass_Reset_Token: { type: String, default: undefined },
    User_Pass_Reset_Token_Life: { type: Date, default: undefined },
  },
  { timestamps: true }
);

// ---------password hashing---------
UserSchema.pre("save", async function (next) {
  // if password hash is not modified go to next middleware
  if (!this.isModified("password_hash")) {
    next();
  }
  // setting password_hash
  this.password_hash = await bcryptjs.hash(this.password_hash, 10);
});

// user method to get user JWT token
UserSchema.method("getJWTtoken", function () {
  const JWT_Token = jwt.sign(
    { userID: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  return JWT_Token;
});

// to compare password while logging IN
UserSchema.method("bcryptComparePassword", async function (enteredPassword) {
  const isPassMatch = await bcryptjs.compare(
    enteredPassword,
    this.password_hash
  );

  return isPassMatch;
});

UserSchema.method("generateResetPasswordToken", function () {
  //create some random bytes usign crypto
  const RandomBytesToken = Crypto.randomBytes(20).toString("hex");

  // creating a hash token using sha256 algo from those randombytes and save it in User_Pass_Reset_Token
  this.User_Pass_Reset_Token = Crypto.createHash("sha256")
    .update(RandomBytesToken)
    .digest("hex");

  // setting User_Pass_Reset_Token_Life
  this.User_Pass_Reset_Token_Life = Date.now() + 15 * 60 * 1000; // Date.now() + 15 min

  console.log({
    User_Pass_Reset_Token: this.User_Pass_Reset_Token,
    User_Pass_Reset_Token_Life: this.User_Pass_Reset_Token_Life,
    RandomBytesToken,
  });

  return RandomBytesToken;
});

module.exports = mongoose.model("User", UserSchema);
