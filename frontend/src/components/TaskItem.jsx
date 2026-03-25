import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);

  const priorityBadge = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const priorityActive = {
    low: "bg-green-500 text-white border-green-500",
    medium: "bg-yellow-500 text-white border-yellow-500",
    high: "bg-red-500 text-white border-red-500",
  };

  const handleSave = () => {
    if (!title.trim()) return;
    onEdit(task.id, { ...task, title, description, priority });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || "");
    setPriority(task.priority);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow border border-blue-200">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
          placeholder="Task title..."
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none h-16 outline-none focus:border-blue-400"
          placeholder="Description (optional)"
        />
        <div className="flex gap-2 items-center flex-wrap">
          <span className="text-xs text-gray-500 font-medium">Priority:</span>
          {["low", "medium", "high"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`px-3 py-1 rounded-full text-xs border transition capitalize
                ${
                  priority === p
                    ? priorityActive[p]
                    : "text-gray-400 border-gray-200"
                }`}
            >
              {p}
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border transition
      ${
        task.completed
          ? "border-gray-100 opacity-60"
          : "border-gray-200 hover:border-blue-200"
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
        className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer"
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            task.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {new Date(task.created_at).toLocaleDateString()}
        </p>
      </div>
      <span
        className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
          priorityBadge[task.priority]
        }`}
      >
        {task.priority}
      </span>
      <button
        onClick={() => setIsEditing(true)}
        className="text-gray-300 hover:text-blue-500 transition"
        title="Edit"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(task.id)}
        className="text-gray-300 hover:text-red-500 transition text-lg leading-none"
        title="Delete"
      >
        Delete
      </button>
    </div>
  );
}
