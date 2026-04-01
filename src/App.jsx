import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import ProductForm from './pages/ProductForm';
import Navbar from './components/Navbar';
import DeletePage from './pages/DeletePage';
import DetailsPage from './pages/DetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>

      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route
          path='/products/:productId/delete'
          element={<DeletePage />}
        ></Route>
        <Route path='/products/:productId' element={<DetailsPage />}></Route>
        <Route path='/add-product' element={<ProductForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
