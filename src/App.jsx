import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateItem from './pages/CreateItem'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>To do list!</h2>
      <CreateItem />
    </>
  )
}

export default App
