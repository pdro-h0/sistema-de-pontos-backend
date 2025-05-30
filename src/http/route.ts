import { Request, Router } from "express";
import { registerUserController } from "./controllers/registerUserController";
import { authenticateUserController } from "./controllers/authenticateUseController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureRole } from "./middlewares/ensureRole";
import { RegisterPunchClockController } from "./controllers/registerPunchClockController";

export const router = Router();
router.post("/user", registerUserController);
router.post("/sessions", authenticateUserController);

router.post(
  "/punch-clock",
  ensureAuthenticated,
  ensureRole("employee"),
  RegisterPunchClockController
);

router.get(
  "/test",
  ensureAuthenticated,
  ensureRole("admin"),
  (req: Request, res) => {
    res.json({
      message: `Bem vindo ${req.user?.id} sua role é ${req.user?.role}`,
    });
  }
);
