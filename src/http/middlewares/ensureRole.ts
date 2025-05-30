import { NextFunction, Request, Response } from "express";

export const ensureRole = (...allowedRoles: ("admin" | "employee")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (!allowedRoles.includes(req.user.role)) {
      res.status(401).json({ message: "Access denied" });
    }
    next();
  };
};
