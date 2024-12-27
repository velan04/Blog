import React, { useEffect, useRef, useState } from 'react';
import blueImage from '../assets/download.jpg';
import pandaImage from '../assets/pandaa.jpg';
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { auth } from '../components/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const email = useRef(null);
    const password = useRef(null);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            );
            toast.success('Logged in successfully!');
            console.log('Logged in user:', userCredential.user);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error('Error during login:', error.message);
            setErrorMsg('An error occurred during login. Please check your credentials.');
        }
    }

    return (
        <div
            className="bgimg h-screen m-auto p-3 flex justify-center items-center"
            style={{
                backgroundImage: `url(${blueImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <ToastContainer 
            position='top-center'/>
            <div className="w-[350px] shadow-2xl rounded-xl p-6 bg-white flex flex-col items-center">
                <img
                    src={pandaImage}
                    alt="Panda"
                    className="w-20 h-20 rounded-full mb-3"
                />
                <h2 className="text-gray-800 font-bold text-lg text-center mb-2">
                    Welcome Back To
                </h2>
                <h1 className="text-blue-500 font-extrabold text-xl text-center mb-4">
                    Blog
                </h1>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
                    <div>
                        <input
                            className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none
                            focus:border-blue-500"
                            type="email"
                            placeholder="Email"
                            ref={email}
                        />
                    </div>
                    <div className="relative">
                        <input
                            className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            ref={password}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 w-full text-white rounded-md h-10 mt-4
                        hover:bg-blue-600 transition-all"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-600 text-sm mt-2">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Signup
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
