import React from 'react'
import Task from './Task'
import { useDrop } from 'react-dnd'
import { ITEM_TYPE } from '../assets/constants'
import { useSetRecoilState } from 'recoil'
import { taskAtom } from '../store/taskAtom'
import { putRequestAxios } from '../services/requests'
import { taskAPI } from '../services/apis'

const TaskListing = ({tasks,status,setTasks,fetchTasks}) => {


  const [{ isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item) => onDropTask(item, status), // Function called on drop
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  async function onDropTask(task,newStatus) {
    try {
      const update = await putRequestAxios(`${taskAPI}`+`/${task.id}`,{
        id:task.id,
        status:newStatus
      },null,null)
    
      fetchTasks();
    } catch (error) {
      
    }
  }



 
  return (
    <div ref={drop} className={`flex flex-col ${isOver ? 'bg-gray-200' : ''}`}>
      <div className='text-2xl py-[1rem] flex justify-center '>
        <button className='px-[5rem] py-[0.5rem] bg-blue-400 shadow-lg text-white font-semibold rounded-3xl hover:bg-blue-500'>{status} </button>
        
      </div>
      <div className='pt-[0.1rem] text-xl flex flex-col'>
      {tasks.length > 0 ? (
          tasks.map((task) => <Task task={task} key={task.id} fetchTasks={fetchTasks}/>)
        ) : (
          <div className='flex justify-center items-center h-[20rem] w-full '>
            <div className='bg-gray-200 w-[60%] h-[30%] rounded-lg shadow-lg text-gray-600 font-semibold flex justify-center items-center'>No Tasks for {status}</div>
            
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskListing