import express from "express";
import { env } from "./env";
import { router } from "./http/route";
import { errorHandler } from "./http/middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);
app.listen(env.PORT, () => {
  console.log(`Server running at port ${env.PORT}`);
});
