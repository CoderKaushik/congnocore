import React, { useState } from 'react';

function AddTask({ addTask }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white hover:cursor-pointer py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default AddTask;