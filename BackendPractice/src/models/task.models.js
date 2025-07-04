import mongoose, { Schema } from "mongoose";
import { taskStatusEnum, availableTaskEnum } from "../utils/constants.js";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: availableTaskEnum,
      default: taskStatusEnum.TODO,
    },
    //! We are storing Attchments in array becoz we will recieve many attachemnts from the user so here we are just defining the types we are going to recieve attachments:type:[{},{},{}]
    attachments: {
      type: [
        {
          url: String,
          mimetype: String,
          size: Number,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export { Task };
