import About from './components/About'
import Header from './components/Header'
import MyContainer  from './components/MyContainer'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
      <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={
          <MyContainer></MyContainer>
        } />
        <Route path="/about" element={
          <About></About>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App