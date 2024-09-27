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
        <div className='app'>
            {APP_NAME}
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