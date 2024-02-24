import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css'; 

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [isRegistered, setIsRegistered] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setIsRegistered(true);
  };

  return (
    <div className="App">
      <h2>React Hook Form Demo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" {...register('firstName', { required: true })} />
          {errors.firstName && <p className="error">First Name is required.</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" {...register('lastName', { required: true })} />
          {errors.lastName && <p className="error">Last Name is required.</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            })}
          />
          {errors.email?.type === 'required' && <p className="error">Email is required.</p>}
          {errors.email?.type === 'pattern' && <p className="error">Invalid email format.</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: true,
              minLength: 5,
              maxLength: 20
            })}
          />
          {errors.password?.type === 'required' && <p className="error">Password is required.</p>}
          {errors.password?.type === 'minLength' && (
            <p className="error">Password must be more than 4 characters.</p>
          )}
          {errors.password?.type === 'maxLength' && (
            <p className="error">Password cannot be more than 20 characters.</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
      {isRegistered && <p className="success-message">Registration successful!</p>}
    </div>
  );
}

export default App;
