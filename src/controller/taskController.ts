import { NextFunction, Request, Response } from "express";
import { taskValidator } from "../model/TaskValidationModel";
import {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  updateTaskStatus,
  getCategoryTypes,
} from "../service/TaskService";
import { taskStatusValidator } from "../model/TaskStatusValidationModel";

export const createTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = taskValidator.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).send({ errors: error });
  try {
    const data = await createTask(req.body, `${req.headers.userId}`);
    res.status(200).send({
      code: 200,
      message: "Task Succesfully Created",
      data: data,
    });
  } catch (error: any) {
    res.status(500).send({
      error: error?.message,
    });
  }
};

export const updateTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = taskValidator.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).send({ errors: error });
  try {
    await updateTask(req.body, req.params.taskId, res);
    res.status(200).send({
      code: 200,
      message: "Task Updated Succesfully",
    });
  } catch (error: any) {
    res.status(res.statusCode).send({
      error: error?.message,
    });
  }
};
export const updateTaskStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = taskStatusValidator.validate(req.body, {
    abortEarly: false,
  });
  if (error) return res.status(400).send({ errors: error });
  try {
    await updateTaskStatus(req.params.taskId, req.body.status, res);
    res.status(200).send({
      code: 200,
      message: "Task Status Updated Succesfully",
    });
  } catch (error: any) {
    res.status(res.statusCode).send({
      error: error?.message,
    });
  }
};

export const getTasksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getTasks(
      res,
      `${req.headers.userId}`,
      req.query.category as string | undefined,
      req.query.status as string | undefined,
      req.query.filterDate as Date | undefined,
      (req.query.isBefore == "true") as boolean | undefined
    );
    res.status(200).send({
      code: 200,
      message: "Tasks Fetched Succesfully",
      tasks: data,
    });
  } catch (error: any) {
    res.status(res.statusCode).send({
      error: error?.message,
    });
  }
};

export const deleteTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteTask(req.params.taskId, res);
    res.status(200).send({
      code: 200,
      message: "Task Deleted Succesfully",
    });
  } catch (error: any) {
    res.status(res.statusCode).send({
      error: error?.message,
    });
  }
};

export const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getCategoryTypes(res);
    res.status(200).send({
      code: 200,
      message: "Categories Fetched Succesfully",
      categories: data,
    });
  } catch (error: any) {
    res.status(res.statusCode).send({
      error: error?.message,
    });
  }
};
