import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { FormAtom } from '../store/FormAtom';
import toast, {} from 'react-hot-toast'
import { postRequestAxios } from '../services/requests';
import { taskAPI } from '../services/apis';

const TaskForm = ({fetchTasks}) => {
  const [title,SetTitle] = useState('')
  const SetformState = useSetRecoilState(FormAtom)

  function saveDataHandler(e){
    SetTitle(e.target.value)
  }
  async function addTaskHandler(e){
    e.preventDefault()
    
   
    try {
      const response = await postRequestAxios(taskAPI,{
        task:title
      },null,null)
      console.log(response.data)
      if(response.data.success){
        SetformState(false)
        SetTitle('')
        toast.success("Task Added Successfully")
        fetchTasks()
        console.log(response.data)
      }
    } catch (error) {
      toast.error("Failed to update Task. Try Again")
      SetTitle('')
    }
  }

  return (
    <div className='flex justify-center'>
      <form onSubmit={addTaskHandler} className='flex flex-col items-center'>
          <input
          type ='textarea'
          name='title'
          placeholder="Title"
          value = {title}
          onChange={saveDataHandler}
          className='w-[17rem] h-[2rem] pl-[0.5rem] rounded-md border-2 border-gray-300 text-gray-600 focus:outline-none'
          ></input>
          <button type='submit' className='px-[1.5rem] py-[0.4rem] mr-[2rem] mt-[1rem] w-[8rem] text-white font-semibold rounded-md ml-[1.5rem] bg-red-500'> Add Task </button>
          
      </form>
    </div>
  )
}

export default TaskForm