import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signin } from '../../actions/auth';

import './auth.scss';

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const { isLoggedIn } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(signin(data.username, data.password))
      .then(() => {
        props.history.push('/cart');
      })
      .catch(() => {
        console.log('Login failed!')
      });
  };

  if (isLoggedIn) {
    return <Redirect to='/cart' />
  }
  return (
    <div className='auth-form'>
      <div className='avatar'>
        <img
          src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
          alt='profile-img'
          className='profile-img-card'
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input
          name='username'
          defaultValue=''
          ref={register({ required: true })}
        />
        {errors.username && <p>Username is required</p>}

        <label>Password</label>
        <input
          type='password'
          name='password'
          ref={register({ required: true, minLength: 6, maxLength: 60 })}
        />

        {errors.password && <p>Paassword is required</p>}
        <input type='submit' />
      </form>

    </div>
  );
};

export default Login;
