import React, { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [title, setTask] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/tasks/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      onAdd(data); 
      setTask('');
    } catch (error) {
      setError('Failed to add task');
    }
  };

  return (
    <form  onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Enter new task"
      />
      <button type="submit">Add</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AddTask;
