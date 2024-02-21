import React from 'react'
import Employee from '../components/Employee/Employee';
import { Navigate } from 'react-router-dom';

export default function EmployeeRoutes() {

    let role = sessionStorage.getItem('role');
    let token = sessionStorage.getItem('token');

    const employee = role === 'employee' && token ?true:null;

    return employee ? <Employee /> : <Navigate to="/" />;
}
