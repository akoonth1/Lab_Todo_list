import { useState } from 'react'
import './App.css'
import CreateItem from './pages/CreateItem'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav'
import DisplayList from './pages/DisplayList';
import { ListItemProvider } from './Context/ListItemContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

     
      <ListItemProvider>
      <Router>
        <h1>To do list!</h1>
        
        <Nav />
        <Routes>
          <Route path="/" element={<DisplayList/>} />
          <Route path="/CreateItem" element={<CreateItem />} />
        </Routes>
      </Router>
    </ListItemProvider>
      {/* <CreateItem /> */}
    </>
  )
}

export default App
