import {Routes,Route} from 'react-router-dom'
import './App.css'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from './pages/Home'
import { RecoilRoot } from 'recoil';

function App() {
  
  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      </RecoilRoot>
      
      </DndProvider>
    </>
  )
}

export default App
