
// import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';


function App() {
  

  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<SignUp/>} />
    <Route path='/dashboard' element={<Dashboard/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
