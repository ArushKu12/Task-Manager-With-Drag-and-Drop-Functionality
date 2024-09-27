import React, { useEffect, useState } from 'react'
import { APP_NAME } from '../assets/constants'
import TaskListing from '../components/TaskListing'

const Home = () => {
    const [loading,setLoading] = useState(null);
    const [tasks,setTasks] = useState([]);
    

    useEffect( async () => {
        setLoading(true);

        try {
            
        } catch (error) {
            
        }
    },[])




  return (
    <div>
        <div className='app'>
            {APP_NAME}
        </div>
        <div className='container-1'>
            <TaskListing />
        </div>
        <div className='container-2'>
            <TaskListing />
        </div>
        <div className='container-3'>
            <TaskListing />
        </div>
    </div>
  )
}

export default Home