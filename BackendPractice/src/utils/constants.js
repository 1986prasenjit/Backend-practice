const userRoleEnum = {
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "memder",
};

const availableUserEnum = Object.values(userRoleEnum);

const taskStatusEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};

const availableTaskEnum = Object.values(taskStatusEnum);

export { availableTaskEnum, availableUserEnum, taskStatusEnum, userRoleEnum };
