import './App.css';
import { AdminLogin } from './AdminLogin';
import { StaffLogin } from './StaffLogin';
import { UserLogin } from './UserLogin';
import { AdminDash } from './AdminDash';
import { StaffDash } from './StaffDash';
import { UserDash } from './UserDash';
import { BrowserRouter,NavLink } from 'react-router-dom';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <h3 className='d-flex justify-content-center m-3'>
        REF HUB
      </h3>

      <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
        <ul className='navbar-nav'>
          <li className='nav-item- m-1'>
              <NavLink className= "btn btn-light btn-outline-primary" to= "/AdminLog">Log as Admin</NavLink>
          </li>
          <li className='nav-item- m-1'>
              <NavLink className= "btn btn-light btn-outline-primary" to= "/UserLog">Log as User</NavLink>
          </li>
          <li className='nav-item- m-1'>
              <NavLink className= "btn btn-light btn-outline-primary" to= "/StaffLog">Log as staff</NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/AdminLog' Component={AdminLogin}></Route>
        <Route path='/UserLog' Component={UserLogin}></Route>
        <Route path='/StaffLog' Component={StaffLogin}></Route>
        <Route path='/AdminDash' Component={AdminDash}></Route>
        <Route path='/StaffDash' Component={StaffDash}></Route>
        <Route path='/UserDash' Component={UserDash}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
