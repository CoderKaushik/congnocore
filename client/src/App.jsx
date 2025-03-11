import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import { Toaster, toast } from 'react-hot-toast';
import Modal from './components/Modal'; // Import the Modal component

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/tasks');
      const data = await response.json();
      setTasks(data);
      setTaskId(data.length ? data[data.length - 1]._id + 1 : 1);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: task }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTaskId(taskId + 1);
      toast.success(`Task  added successfully!`, { position: 'top-right' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskToDelete) => {
    try {
      await fetch(`/tasks/${taskToDelete._id}`, {
        method: 'DELETE',
      });
      const updatedTasks = tasks.filter(task => task._id !== taskToDelete._id);
      setTasks(updatedTasks);
      toast.error(`Task deleted successfully!`, { position: 'top-right' });
      if (updatedTasks.length === 0) {
        setTaskId(1);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const deleteAllTasks = async () => {
    try {
      const response = await fetch('/tasks', {
        method: 'DELETE',
      });
      if (response.ok) {
        setTasks([]);
        setTaskId(1);
        toast.error('All tasks deleted successfully!', { position: 'top-right' });
      } else {
        console.error('Error deleting all tasks:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting all tasks:', error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmDeleteAllTasks = () => {
    deleteAllTasks();
    closeModal();
  };

  return (
    <div className="app-container min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Task Manager</h1>
        <div className="mb-6">
          <AddTask addTask={addTask} />
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks added yet. Start by adding one!</p>
          ) : (
            <>
              <TaskList tasks={tasks} deleteTask={deleteTask} />
              <div className="mt-6 flex justify-end">
                <button
                  onClick={openModal}
                  className="bg-red-600 hover:cursor-pointer text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete All Tasks
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title="Confirm Delete"
          message="Are you sure you want to delete all tasks?"
          onConfirm={confirmDeleteAllTasks}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}

export default App;