import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../env";

interface JwtPayload {
  userId?: string;
  adminId?: string;
  role: "admin" | "employee";
}

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    decoded.role === "employee"
      ? (req.user = {
          userId: decoded.userId,
          role: decoded.role,
        })
      : (req.user = {
          adminId: decoded.userId,
          role: decoded.role,
        });
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
