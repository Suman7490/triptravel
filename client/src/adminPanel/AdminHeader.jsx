import React from 'react';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user'); // or your auth method
        navigate('/');
    };

    return (
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <h4 className="m-0">Dashboard</h4>
            <Button color="danger" size="sm" onClick={logout}>Logout</Button>
        </div>
    );
};

export default AdminHeader;
