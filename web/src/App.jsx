import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Varieties from './pages/Varieties'
import VarietyDetail from './pages/VarietyDetail'
import CookingMethods from './pages/CookingMethods'
import Scenarios from './pages/Scenarios'
import Brands from './pages/Brands'
import Suppliers from './pages/Suppliers'
import History from './pages/History'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="varieties" element={<Varieties />} />
          <Route path="varieties/:name" element={<VarietyDetail />} />
          <Route path="cooking" element={<CookingMethods />} />
          <Route path="scenarios" element={<Scenarios />} />
          <Route path="brands" element={<Brands />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
