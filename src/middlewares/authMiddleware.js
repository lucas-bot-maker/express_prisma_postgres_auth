import jwt from "jsonwebtoken";
import "dotenv/config";

export const generate_jwt = async (payload) => {
  const jwt_secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, jwt_secret);
  return token;
};

export const auth_middleware = async (req, res, next) => {
  // check for auth token
    console.log("[authenticate]", req.method, req.originalUrl, "header:", req.headers.authorization?.slice(0, 20));
  const auth_token = req.headers["authorization"]?.split(" ")[1];

  // console.log("auth header: ", req.headers);
  if (!auth_token) return res.sendStatus(401);

  // verify jwt token, decrypt the token and get user_id
  const jwt_secret = process.env.JWT_SECRET;
  const user_id = jwt.verify(auth_token, jwt_secret);
  console.log("user_id: ", user_id);
  req.user_id = user_id["user_id"];

  next();
};

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user_role) return res.sendStatus(401);

    if (!allowedRoles.includes(req.user_role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  };
};

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
 const { user_id, role } = jwt.verify(token, process.env.JWT_SECRET);
   req.user_id = user_id;
   req.user_role = role;
   next();
    } catch (err) {
     console.log("[authenticate] failed:", err.message);
     return res.sendStatus(401);
   }
};

