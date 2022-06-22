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
const createTask = async (req, res) => {
  try {
    const payload = req.body;

    await req.db.query("INSERT INTO tasks (timeKey, taskText) VALUES (?,?)", [
      payload.timeKey,
      payload.taskText,
    ]);

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to add tasks | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to add tasks",
    });
  }
};
const deleteTask = (req, res) => {};

const editTask = async (req, res) => {
  try {
    const payload = req.body;

    await req.db.query(
      `UPDATE tasks SET taskText = "${payload.taskText}" WHERE timeKey = "${payload.timeKey}"`
    );

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to edit task | ${error.message}]`);

    return res.status(500).json({
      success: false,
      error: "Failed to edit task",
    });
  }
};

const clearAllTasks = (req, res) => {};

module.exports = { getTasks, createTask, deleteTask, editTask, clearAllTasks };
