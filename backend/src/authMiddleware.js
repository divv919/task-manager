import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const completeToken = req.headers["authorization"];

  const token = completeToken && completeToken.split(" ")[1];
  if (!token) {
    res.status(404).json({ message: "Unauthorized Access" });
    return;
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;

    next();
  } catch (err) {
    res.status(404).json({ message: "Expired token" });
    return;
  }
};
