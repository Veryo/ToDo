
import React, { useState, useEffect} from 'react';
import AddTask from '../components/AddTask';

const Home = () => {

 
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    getTasks();

  }, []);  

  const getTasks = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/delete/${taskId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      } else {
        getTasks()
        console.log('Task deleted successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateTask = async (task) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/update/${task.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title:task.title ,  completed: true }),
      });
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      } else {
        
        getTasks(); 
        console.log('Task updated successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const unUpdateTask = async (task) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/update/${task.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title:task.title ,  completed: false }), 
      });
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      } else {
      
        getTasks(); 
        console.log('Task updated successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const editTask = async (taskId, newTitle) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/update/${taskId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }), 
      });
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      } else {
        getTasks(); 
        console.log('Task updated successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
const [editTaskId, setEditTaskId] = useState(null);
const [editTaskTitle, setEditTaskTitle] = useState('');

const handleEdit = (task) => {
  setEditTaskId(task.id);
  setEditTaskTitle(task.title);
};

const handleCancelEdit = () => {
  setEditTaskId(null);
  setEditTaskTitle('');
};

const handleSaveEdit = async () => {
  await editTask(editTaskId, editTaskTitle);
  setEditTaskId(null);
  setEditTaskTitle('');
};
  

  return (
    <>
        <div className='container'>
        
          <div className='border'>
            <h1>Actual Tasks</h1>
            {<AddTask onAdd={getTasks} />}
    
            {tasks && tasks
              .filter(task => !task.completed) 
              .map(task => (
                <div className='task' key={task.id}> 
                  <div className='task-text'>{task.title}</div>
                  {editTaskId === task.id ? (
                    <div className="task-buttons">
                      <input
                        type="text"
                        value={editTaskTitle}
                        onChange={(e) => setEditTaskTitle(e.target.value)}
                      />
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <div className="task-buttons">
                      <button onClick={() => updateTask(task)}>Complete</button>
                      <button onClick={() => handleEdit(task)}>Edit</button>
                      <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                  )}
                </div>
            ))}
          </div>

          <div className='border'>
            <h1>Completed Tasks</h1>

            {tasks && tasks
              .filter(task => task.completed) 
              .map(task => (
                <div className='task' key={task.id}> 
                  <div className='task-text'>{task.title}</div>
                  {editTaskId === task.id ? (
                    <div className="task-buttons">
                      <input
                        type="text"
                        value={editTaskTitle}
                        onChange={(e) => setEditTaskTitle(e.target.value)}
                      />
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <div className="task-buttons">
                      <button onClick={() => unUpdateTask(task)}>Uncomplete</button>
                      <button onClick={() => handleEdit(task)}>Edit</button>
                      <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                  )}
                </div>
            ))}
          </div>

        </div>
    
    </>
  )
}

export default Home