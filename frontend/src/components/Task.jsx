import React from 'react'
import { useDrag } from 'react-dnd';
import { ITEM_TYPE } from '../assets/constants';


const Task = ({task}) => {
    
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ITEM_TYPE,
        item: { id: task.id, title: task.title, status: task.status }, // Data to pass on drag
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));

  return (
    <div ref={drag}
    className='text-xl text-black px-[2rem] py-[1rem] bg-blue-500 mx-[0.5rem] my-[0.5rem]'
    style={{ opacity: isDragging ? 0.5 : 1 }}>
        {task.title}


    </div>
  )
}

export default Task