import {Routes,Route} from 'react-router-dom';
import Login from './components/UserLogin/Login';
import Employee from './components/Employee/Employee';
import Dashboard from './components/Admin/Dashboard';
import AdminRoutes from './Routes/AdminRoutes';
import EmployeeRoutes from './Routes/EmployeeRoutes';

const Routing = [
      <Routes>
        <Route path='/' element={<Login/>} />

      {/* employee routes */}
        <Route exact path="/" element={<EmployeeRoutes />}> 
              <Route path='/employee' element={<Employee/>} />
        </Route>
      
      {/* admin routes */}
        <Route exact path="/" element={<AdminRoutes />}>
            <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
      </Routes>
]

export default Routing;