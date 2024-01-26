import mongoose from "mongoose";
import { TaskModel as Task } from "../model/TaskModel";
import { CategoryTypes } from "../model/CategoryTypes";
import { Response } from "express";

export const createTask = async (task: any, userId: String) => {
  const userObjId = new mongoose.Types.ObjectId(`${userId}`);
  task.belongsTo = userObjId;
  const data = await Task.create(task);
  return data;
};

export const updateTask = async (task: any, taskId: string, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400);
    throw new Error("Wrong id Provided");
  }
  try {
    const data = await Task.findByIdAndUpdate(taskId, { $set: task });
    return data;
  } catch (error) {
    res.status(500);
    throw error;
  }
};

export const updateTaskStatus = async (
  taskId: string,
  status: string,
  res: Response
) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400);
    throw new Error("Wrong id Provided");
  }
  try {
    const data = await Task.findByIdAndUpdate(taskId, {
      $set: { status: status },
    });
    return data;
  } catch (error) {}
};

export const deleteTask = async (taskId: string, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400);
    throw new Error("Wrong id Provided");
  }
  try {
    const data = await Task.findByIdAndDelete(taskId);
    return data;
  } catch (error) {
    res.status(500);
    throw error;
  }
};

export const getTasks = async (
  res: Response,
  userId: String,
  category?: String,
  status?: String,
  filterDate?: Date,
  isBefore?: Boolean
) => {
  try {
    const filters: any = { belongsTo: userId };
    if (category) filters.category = category;
    if (status) filters.status = status;
    if (filterDate && isBefore != undefined) {
      console.log("param", typeof isBefore);
      if (isBefore) {
        filters.dueDate = { $lte: filterDate };
      } else {
        //   console.log("param", false);
        filters.dueDate = { $gte: filterDate };
      }
    }

    const data = await Task.find(filters);
    return data;
  } catch (error) {
    res.status(500);
    throw error;
  }
};

export const getCategoryTypes = async (res: Response) => {
  try {
    return Object.values(CategoryTypes);
  } catch (error) {
    res.status(500);
    throw error;
  }
};
