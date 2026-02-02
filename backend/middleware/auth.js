import jwt from "jsonwebtoken";
const JWT_SECRET = "your_secret_key";

export const authMiddleware =
  (roles = []) =>
  (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role))
        return res.status(403).json({ message: "Forbidden" });

      req.user = decoded; // contains id and role
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
