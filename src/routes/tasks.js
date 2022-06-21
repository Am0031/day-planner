const { Router } = require("express");

const {
  getTasks,
  createTask,
  deleteTask,
  editTask,
  clearAllTasks,
} = require("../controllers/tasks");

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.put("/:id", editTask);
router.delete("/", clearAllTasks);

module.exports = router;
