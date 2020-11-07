import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { signup } from "../../actions/auth";

import './auth.scss';

const Register = (props) => {

  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(signup(data.username, data.email, data.password))
      .then(() => {
        props.history.push("/cart");
        window.location.reload();
      })
      .catch(() => {
        console.log('Signup failed!')
      });
  };

  return (
    <div className="auth-form">
      <div className="avatar">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input
          name="username"
          defaultValue=""
          ref={register({ required: true })}
        />
        {errors.username && <p>Username is required</p>}

        <label>Email</label>
        <input
          name="email"
          defaultValue=""
          ref={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && errors.email.message}

        <label>Password</label>
        <input
          type="password"
          name="password"
          ref={register({ required: true, minLength: 6, maxLength: 60 })}
        />

        {errors.password && <p>Paassword is required</p>}
        <input type="submit" />
      </form>


    </div>
  );
};

export default Register;
