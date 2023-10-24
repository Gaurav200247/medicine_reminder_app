const SendResponseCookie = (user, res, status_code, msg) => {
  const userToken = user.getJWTtoken(); // got token

  // setting cookie config
  const cookieOptions = {
    maxAge: process.env.COOKIE_LIFETIME * (24 * 60 * 60 * 1000), // lifetime * 1 day
    httpOnly: true,
    secure: true,
  };

  // response
  res.status(status_code).cookie("userToken", userToken, cookieOptions).json({
    success: true,
    msg,
    user,
    userToken,
  });
};

module.exports = SendResponseCookie;
