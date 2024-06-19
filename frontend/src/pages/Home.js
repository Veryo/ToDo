
import React, { useState, useEffect} from 'react';

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
  console.log(tasks)
  
  return (
    <>
    <div className='body'>
        <div className='container'>
            
            <div className='not_completed'>
                <h1>Actual Tasks</h1>
                {tasks.map(task => (
    <div className='tasks' key={task.id}> {/* Move key={task.id} here */}
       
            <div className='task-text'>{task.title}</div>
            <div className='task-buttons'>
                <button>Edit</button>
                <button>Delete</button>
           
        </div>
        </div>
            ))}
            </div>
            
       


            <div className='completed'>
                <h1>Completed Tasks</h1>
            <div className='tasks'>
            <div className='tasks-text'> AGAGAG</div>
            <div className='tasks-buttons'>
            <button>Description</button>
            <button> edit</button>
            <button> delete</button>
            </div>
           
            </div>

            </div>
        </div>
    </div>
    </>
  )
}

export default Home