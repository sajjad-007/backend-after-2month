const { successResponse } = require("../utilitis/successResponse");
const { errorResponse } = require("../utilitis/errorResponse");
const jwt = require("jsonwebtoken");
const authGuard = async (req, res, next) => {
  try {
    if (req.headers.cookie) {
      const token = req.headers.cookie.replace("token=", "").trim();
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      next()
    } else if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "").trim();
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      next()
    } else {
      return res
        .status(401)
        .json(new errorResponse(401, "token Invalid or expire ", null, true));
    }
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, "Error from authGaurd middleware", null, error)
      );
  }
};

module.exports = { authGuard };
