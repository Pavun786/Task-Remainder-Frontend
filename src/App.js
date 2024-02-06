import logo from './logo.svg';
import './App.css';
import Register from './Register';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Auth from './Auth';
import CreateTask from './CreateTask';
import EditTask from './EditTask';

function App() {
  return (
    <div className="App">
     
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/register" element={<Register/>}
      />
      <Route path='/home' element={
      <Auth>
      <Home/>
      </Auth>}
      />
      <Route path='/create' element={
      <Auth>
      <CreateTask/>
      </Auth>
      }/>
      <Route path='/edit/:id' element={
      <Auth>
      <EditTask/>
      </Auth>
      }/>
     </Routes>
     
    </div>
  );
}

export default App;
