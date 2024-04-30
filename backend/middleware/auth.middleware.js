import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token)
    return res.status(401).json({ success: false, message: "Access Denied" });

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decodeToken.id;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;
