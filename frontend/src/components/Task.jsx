import React from 'react'
import { useDrag } from 'react-dnd';
import { ITEM_TYPE } from '../assets/constants';
import { postRequestAxios } from '../services/requests';
import { deleteAPI } from '../services/apis';
import toast, {} from 'react-hot-toast'

const Task = ({task,fetchTasks}) => {
    
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ITEM_TYPE,
        item: { id: task.id, title: task.title, status: task.status }, // Data to pass on drag
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));

      async function deleteHandler(e){
        try {
          const response = await postRequestAxios(deleteAPI,{
            id:task.id
          },null,null)
          if(response.data.success){
            toast.success("Task Deleted Successfully")
            fetchTasks();
          }
        } catch (error) {
          
        }
      }

  return (
    <div ref={drag}
    className='shadow-lg border-gray-200 border-2 text-xl text-gray-500 rounded-lg px-[2rem] py-[1.2rem] bg-gray-200 mx-[0.5rem] my-[0.5rem] flex justify-between font-semibold'
    style={{ opacity: isDragging ? 0.5 : 1 }}>
        {task.title}

        <button onClick={deleteHandler} className='shadow-md rounded-md bg-red-300 px-[1rem] py-[0.2rem] text-red-500 hover:bg-red-200 hover:text-red-700'>X</button>

    </div>
  )
}

export default Task