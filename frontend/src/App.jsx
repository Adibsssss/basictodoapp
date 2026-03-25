import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api/tasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch(() =>
        setError(
          "Could not connect to the server. Make sure Django is running."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (data) => {
    try {
      const res = await createTask(data);
      setTasks((prev) => [res.data, ...prev]);
    } catch {
      alert("Failed to add task.");
    }
  };

  const handleToggle = async (task) => {
    try {
      const res = await updateTask(task.id, {
        ...task,
        completed: !task.completed,
      });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? res.data : t)));
    } catch {
      alert("Failed to update task.");
    }
  };

  const handleEdit = async (id, data) => {
    try {
      const res = await updateTask(id, data);
      setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch {
      alert("Failed to update task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Failed to delete task.");
    }
  };

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">My To-Do List</h1>
          <p className="text-sm text-gray-500 mt-1">
            {completedCount} of {tasks.length} tasks completed
          </p>
        </div>

        {/* Form */}
        <div className="mb-4">
          <TaskForm onAdd={handleAdd} />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition
                ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            Loading tasks...
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-400 text-sm bg-red-50 rounded-xl border border-red-100 p-4">
            ⚠️ {error}
          </div>
        ) : (
          <TaskList
            tasks={filtered}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
}
