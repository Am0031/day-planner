const getTasks = async (req, res) => {
  try {
    const [tasks] = await req.db.query("SELECT * FROM tasks");

    return res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to get tasks | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to get tasks",
    });
  }
};
const createTask = (req, res) => {};
const deleteTask = (req, res) => {};
const editTask = (req, res) => {};
const clearAllTasks = (req, res) => {};

module.exports = { getTasks, createTask, deleteTask, editTask, clearAllTasks };
