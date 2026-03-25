import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description: desc, priority, completed: false });
    setTitle('');
    setDesc('');
    setPriority('medium');
  };

  const priorityColors = {
    low: 'bg-green-500 text-white border-green-500',
    medium: 'bg-yellow-500 text-white border-yellow-500',
    high: 'bg-red-500 text-white border-red-500',
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5 bg-white rounded-xl shadow border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700">Add New Task</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title..."
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description (optional)"
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none h-16 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
      <div className="flex gap-2 items-center flex-wrap">
        <span className="text-xs text-gray-500 font-medium">Priority:</span>
        {['low', 'medium', 'high'].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPriority(p)}
            className={`px-3 py-1 rounded-full text-xs border transition capitalize
              ${priority === p ? priorityColors[p] : 'text-gray-400 border-gray-200 hover:border-gray-400'}`}
          >
            {p}
          </button>
        ))}
        <button
          type="submit"
          className="ml-auto px-5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
        >
          + Add Task
        </button>
      </div>
    </form>
  );
}
