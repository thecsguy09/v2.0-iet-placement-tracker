import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './redux/store'
import Index from './pages/Index'
import BatchPage from './components/BatchPage'
import './index.css'

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/batch/:batch" element={<BatchPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
)

export default App
