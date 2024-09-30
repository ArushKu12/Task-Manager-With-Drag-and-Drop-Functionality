import React, { useEffect, useState } from 'react'
import { APP_NAME } from '../assets/constants'
import TaskListing from '../components/TaskListing'
import { getRequestAxios } from '../services/requests';
import { taskAPI } from '../services/apis';
import Loader from '../components/Loader';
import "../styles/Home.css"
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { taskAtom } from '../store/taskAtom';


const Home = () => {
    const [loading,setLoading] = useState(null);
    const [tasks,setTasks] = useRecoilState(taskAtom);
    
    

    const filteredTasksToDo = (tasks || []).filter(task => task?.status === 'to-do');
  const filteredTasksOngoing = (tasks || []).filter(task => task?.status === 'ongoing');
  const filteredTasksDone = (tasks || []).filter(task => task?.status === 'done');


    useEffect( () => {
        setLoading(true)
       fetchTasks();
       setLoading(false)
    },[])

   

    const fetchTasks = async () => {
       
            
        try {
            
            const response = await getRequestAxios(taskAPI,null,null);
           setTasks(response.data.data)
            
            
            
        } catch (error) {
            console.log(error);
           
        }
    }


    if(loading){

        return (
        <div className='flex justify-center items-center'>
            <Loader />
        </div>
        )
    }

  return (
    <div className='w-screen h-screen '>
        <div className='flex justify-between w-full px-[2.5rem] shadow-md pb-[0.7rem] bg-blue-200 pt-[0.6rem]'>
            <div className='app text-gray-500 text-3xl font-semibold hover:text-gray-700 cursor-pointer pt-[0.2rem]'>
                {APP_NAME}
            </div>
            <button className='px-[2rem] bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 py-[0.6rem] '>+ Add New Tasks</button>
        </div>
       
        <div className='container'>
            <div className='container-1' >
                <TaskListing fetchTasks={fetchTasks} setTasks={setTasks} tasks={filteredTasksToDo} status='to-do' />
            </div>
            <div className='container-2'>
                <TaskListing fetchTasks={fetchTasks} setTasks={setTasks} tasks={filteredTasksOngoing} status='ongoing'/>
            </div>
            <div className='container-3'>
                <TaskListing fetchTasks={fetchTasks} setTasks={setTasks} tasks={filteredTasksDone} status='done'/>
            </div>
        </div>
        
    </div>
  )
}

export default Home