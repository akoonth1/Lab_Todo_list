import { useState } from 'react'
import './App.css'
import CreateItem from './pages/CreateItem'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav'
import DisplayList from './pages/DisplayList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <h2>To do list!</h2>
     
      <Router>
      <Nav />
        <Routes>
          <Route path="/CreateItem" element={<CreateItem />} />
          <Route path="/" element={<DisplayList/>} />
        </Routes>
      </Router>
      {/* <CreateItem /> */}
    </>
  )
}

export default App
