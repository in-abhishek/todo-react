import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Edit from './Components/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
