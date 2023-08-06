const asyncHandler = require("express-async-handler");
const errorHandler = asyncHandler(async (err, req, res, next) => {
  console.log("middleware exception: ", err);
  if (res.headersSent) {
    return next(err);
  }
  //   res.render('error', { error: err })
  res.status(500).send("Something went wrong!");
  next();
});

module.exports = {
  errorHandler,
};
