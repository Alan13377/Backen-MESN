import jwt from "jsonwebtoken";
import "dotenv/config";

export const TokenValidation = (request, response, next) => {
  try {
    const token = request.header("Authorization");
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    request.userId = payload._id;
    next();
  } catch (error) {
    response.status(401).json(error);
  }
};
