import { useState } from 'react'
import MainComponent from './components/MainComponent';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <MainComponent /> 
    </>
  )
}

export default App
