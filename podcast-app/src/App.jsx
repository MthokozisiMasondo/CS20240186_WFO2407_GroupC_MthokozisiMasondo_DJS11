import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import PodcastDetails from './pages/PodcastDetails'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="id/:id" element={<PodcastDetails />} />

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
