import mongoose, { Schema } from "mongoose";
import { availableUserEnum, userRoleEnum } from "../utils/constants.js";

const projectMemberSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  role: {
    type: String,
    enum: availableUserEnum,
    default: userRoleEnum.MEMBER,
  },
});

const ProjectMember = mongoose.model("ProjectMember", projectMemberSchema);

export { ProjectMember };
