import { Router } from "express";
import { registerUserController } from "./controllers/registerUserController";
import { authenticateUserController } from "./controllers/authenticateUseController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureRole } from "./middlewares/ensureRole";
import { RegisterPunchClockController } from "./controllers/registerPunchClockController";
import { getPunchHisotryController } from "./controllers/GetPunchHisotryController";
import { getEmployeesRecordsController } from "./controllers/getEmployeesRecordsController";
import { generateEmployeesRecordsController } from "./controllers/generateEmployeesRecordsController";

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
  "/punch-clock/history",
  ensureAuthenticated,
  ensureRole("employee"),
  getPunchHisotryController
);
router.get(
  "/admin/punch-clock",
  ensureAuthenticated,
  ensureRole("admin"),
  getEmployeesRecordsController
);
router.get(
  "/admin/reports",
  ensureAuthenticated,
  ensureRole("admin"),
  generateEmployeesRecordsController
);
