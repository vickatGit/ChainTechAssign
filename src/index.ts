import express, { Request, Response } from "express";
import { config } from "dotenv";
import { dbConnect } from "./config/dbConnect";
import authRouter from "./routes/AuthRoutes";
import taskRouter from "./routes/TaskRoutes";
config();
const app = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server Health is Good 👍👍");
});
app.use("/auth/", authRouter);
app.use("/tasks/", taskRouter);
app.listen(process.env.PORT, async () => {
  await dbConnect();
  console.log("Server Health is Good 👍👍");
});
export default app;
