    import React, { useRef, useState } from 'react';
    import blueImage from '../assets/download.jpg';
    import pandaImage from '../assets/pandaa.jpg';
    import { FaEye, FaEyeSlash } from "react-icons/fa";
    import { auth } from '../components/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
    import { useNavigate } from 'react-router-dom';

    const Signup = () => {
        const [passwordVisible, setPasswordVisible] = useState(false);
        const username = useRef(null);
        const email = useRef(null);
        const password = useRef(null);
        const [errorMsg, setErrorMsg] = useState({ username: '', email: '', password: '' });
        const navigate = useNavigate();

        const togglePasswordVisibility = () => {
            setPasswordVisible(!passwordVisible);
        };

        const validUsername = (username) => {
            return username.length >= 3; // Example: Minimum 3 characters
        };

        const validEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        const validPassword = (password) => {
            return password.length >= 6; // Example: Minimum 6 characters
        };

        const handleSignup = async(e) => {
            e.preventDefault();

            const usernameValue = username.current.value.trim();
            const emailValue = email.current.value.trim();
            const passwordValue = password.current.value.trim();

            let isValid = true;
            let errors = { username: '', email: '', password: '' };

            // Validate Username
            if (!usernameValue) {
                errors.username = 'Username is required.';
                isValid = false;
            } else if (!validUsername(usernameValue)) {
                errors.username = 'Username must be at least 3 characters.';
                isValid = false;
            }

            // Validate Email
            if (!emailValue) {
                errors.email = 'Email is required.';
                isValid = false;
            } else if (!validEmail(emailValue)) {
                errors.email = 'Invalid email format.';
                isValid = false;
            }

            // Validate Password
            if (!passwordValue) {
                errors.password = 'Password is required.';
                isValid = false;
            } else if (!validPassword(passwordValue)) {
                errors.password = 'Password must be at least 6 characters.';
                isValid = false;
            }

            setErrorMsg(errors);

            if (isValid) {
                const formData = {
                    username: usernameValue,
                    email: emailValue,
                    password: passwordValue
                };
                try {
                    // Create user with email and password
                    const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);

                    // Set the display name
                    await updateProfile(userCredential.user, {
                        displayName: usernameValue,
                    });
                    navigate('/login');

                } catch (error) {
                    if (error.code === "auth/email-already-in-use") {
                        setErrorMsg({ ...errors, email: "This email is already in use." });
                    } else {
                        console.error("Error during signup:", error);
                        setErrorMsg({ ...errors, email: "Failed to sign up. Please try again later." });
                    }
                }
        };
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
                <div className="w-[350px] shadow-2xl rounded-xl p-6 bg-white flex flex-col items-center">
                    <img
                        src={pandaImage}
                        alt="Panda"
                        className="w-20 h-20 rounded-full mb-3"
                    />
                    <h2 className="text-gray-800 font-bold text-lg text-center mb-2">
                        Welcome to
                    </h2>
                    <h1 className="text-blue-500 font-extrabold text-xl text-center mb-4">
                        Blog
                    </h1>
                    <form className="flex flex-col gap-4 w-full" onSubmit={handleSignup}>
                        {/* Username Field */}
                        <div>
                            <input
                                className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                type="text"
                                placeholder="Username"
                                ref={username}
                            />
                            {errorMsg.username && <p className="text-red-500 text-sm mt-1">{errorMsg.username}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <input
                                className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                type="email"
                                placeholder="Email"
                                ref={email}
                            />
                            {errorMsg.email && <p className="text-red-500 text-sm mt-1">{errorMsg.email}</p>}
                        </div>

                        {/* Password Field */}
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
                            {errorMsg.password && <p className="text-red-500 text-sm mt-1">{errorMsg.password}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 w-full text-white rounded-md h-10 mt-4 hover:bg-blue-600 transition-all"
                        >
                            Signup
                        </button>
                        <p className="text-center text-gray-500 text-sm">
                            Already have an account? <a href="/login" className="text-blue-500">Login</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    };

    export default Signup;
