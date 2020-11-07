import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch, Route, Link } from 'react-router-dom';

import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Cart from './pages/dashboard/cart';
import Profile from './pages/dashboard/profile';

import { logout } from './actions/auth';

import { history } from './helpers/history';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          {currentUser ? (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/cart'} className='nav-link'>
                  {currentUser.username}
                </Link>
              </li>
              <li className='nav-item'>
                <a href='/login' className='nav-link' onClick={logOut}>
                  Log out
                </a>
              </li>
            </div>
          ) : (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/login'} className='nav-link'>
                  Login
                </Link>
              </li>

              <li className='nav-item'>
                <Link to={'/register'} className='nav-link'>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className='container mt-5'>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/cart' component={Cart} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
