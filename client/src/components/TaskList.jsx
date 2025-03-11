import React from 'react';

function TaskList({ tasks, deleteTask }) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li key={task.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
          <span className="text-gray-700">{`Task: ${task.text}`}</span>
          <button
            onClick={() => deleteTask(task)}
            className="text-red-600 hover:cursor-pointer hover:text-red-700 transition-colors"
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;