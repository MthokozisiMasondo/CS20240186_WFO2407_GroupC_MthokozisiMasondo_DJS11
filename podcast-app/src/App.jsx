import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Favourites from './pages/Favourites'
import PodcastDetails from './pages/PodcastDetails'
import { FavouritesProvider } from './FavouritesContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <FavouritesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="id/:id" element={<PodcastDetails />} />
            <Route path="/favourites" element={<Favourites />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </FavouritesProvider>
  )
}

export default App 
