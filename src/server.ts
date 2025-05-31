import express from "express";
import { env } from "./env";
import { router } from "./http/route";
import { errorHandler } from "./http/middlewares/errorHandler";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

setupSwagger(app);

app.listen(env.PORT, () => {
  console.log(`Server running at port ${env.PORT}`);
});
