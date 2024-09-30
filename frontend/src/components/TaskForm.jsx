import React, { useState } from 'react'

const TaskForm = () => {
  const [inputData,SetInputData] = useState({
    title:''
    
  })

  function saveDataHandler(e){
    const {name,value} = e.target;

    SetInputData({
      ...prevData,
      [name]:value
    }
    )
  }

  return (
    <div>
      <form onSubmit={addTaskHandler}>
          <input
          type ='textarea'
          name='title'
          placeholder="Title"
          value = {inputData.title}
          onchange={saveDataHandler}
          ></input>
          <button type='submit' className='px-[3rem] py-[1rem] '> Add Task </button>
          
      </form>
    </div>
  )
}

export default TaskForm