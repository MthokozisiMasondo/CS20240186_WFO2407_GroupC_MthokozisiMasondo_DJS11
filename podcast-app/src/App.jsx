import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
