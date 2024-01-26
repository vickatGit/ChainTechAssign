import { Router } from "express";
import { authvalidator } from "../middleware/AuthMiddleware";
import {
  createTaskController,
  deleteTaskController,
  getCategoriesController,
  getTasksController,
  updateTaskController,
  updateTaskStatusController,
} from "../controller/taskController";
const router = Router();

router.use(authvalidator);

router.route("/tasks").get(getTasksController);
router.route("/task/:taskId").delete(deleteTaskController);
router.route("/task/:taskId").patch(updateTaskController);
// router.route("/status/:taskId/").patch(updateTaskStatusController)
router.route("/task").post(createTaskController);
router.route("/categories").get(getCategoriesController);
// router.route("/tasks").get(getCategoriesController);

export default router;
