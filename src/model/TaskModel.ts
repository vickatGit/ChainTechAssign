import mongoose from "mongoose";
import { TaskStatus } from "./TaskStatus";
import { CategoryTypes } from "./CategoryTypes";

export const TaskModel = mongoose.model(
  "Task",
  new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      trim: true,
      enum: Object.values(TaskStatus),
      default: TaskStatus.Pending,
    },
    belongsTo: { type: mongoose.Schema.ObjectId, ref: "Task", required: true },
    dueDate: { type: Date, required: false },
    category: {
      type: String,
      required: false,
      trim: true,
      enum: Object.values(CategoryTypes),
      default: CategoryTypes.Other,
    },
  })
);
