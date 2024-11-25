import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/Common/InputField';
import { auth } from '../redux/slices/authSlice';
import { login } from '../services/UserService';

export interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: { username: any; password: any; }) => {
    setLoading(true);
    const { username, password } = data;

    try {
      const response = await login(username, password);
      if(response) {
        dispatch(auth(response.token))
        localStorage.setItem('authToken',response.token);

        navigate('/');
      }
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 translate-y-[50px]">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Login.</h1>
        <p className="text-gray-600 mt-2">Please log in with your username and password.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField
          id="username"
          label="Username"
          placeholder="Enter your username"
          type="text"
          register={() => register('username', { required: 'Username is required' })}
          error={errors.username?.message}
        />
        <InputField
          id="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          register={()=>register('password', { required: 'Password is required' })}
          error={errors.password?.message}
        />
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <button
          role='button'
          type="submit"
          name="Login"
          className={`w-full bg-blue-500 text-white py-2 rounded-lg transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  </div>
  );
};

export default Login;