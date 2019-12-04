import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => (
    <div className="row">
        <div className="col-lg-12 text-center">
            <p>
                <Link to='loginForm' className="btn btn-success btn-space">Login</Link>
            </p>
        </div>
    </div>
)


export default Login;
