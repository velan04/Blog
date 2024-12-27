import React, { useState } from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { FaUserAlt } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [dropDown, setDropDown] = useState(false);
    const user = auth.currentUser;

    const toggleDropDown = () => {
        setDropDown(!dropDown);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast('Logout successful!', {
                position: 'top-center',
                autoClose: 3000,
            });

        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Error logging out. Please try again.', {
                position: 'top-center',
                autoClose: 3000,
            });
        }
    };

    return (
        <nav className="bg-white p-1 px-4 shadow-lg sticky top-0 z-50">
            <ToastContainer />
            <div className="flex justify-between items-center">
                <video autoPlay loop muted className="w-28 h-20 rounded-full">
                    <source src="/logo.mp4" type="video/mp4" />
                </video>
                <ul className="flex items-center gap-6">
                    <NavLink to="/"className={({ isActive }) =>
                        `text-lg  transition duration-300 ${isActive ? 'text-blue-400' : 'text-black'}`}>
                        <li>Home</li>
                    </NavLink>

                    <NavLink to="/myblog" className={({ isActive }) =>
                        `text-lg transition duration-300 ${isActive ? 'text-blue-400' : 'text-black'}`}>
                        <li>My Videos</li>
                    </NavLink>
                    <div className="relative cursor-pointer"
                        onClick={toggleDropDown}>
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                            {dropDown ? <RxCross1 /> : <FaUserAlt />}
                        </div>
                        {dropDown && (
                            <div className="absolute right-0 top-14 bg-gray-800 text-white w-48 
                                rounded-md p-4 flex flex-col gap-4 shadow-lg z-50">
                                <h3 className="font-semibold text-base">Blog Account</h3>
                                <h4 className="text-sm">{user.displayName}</h4>
                                <h5 className="text-sm">{user?.email}</h5>
                                <button
                                    className="bg-red-600 w-full py-2 rounded-md text-white hover:bg-red-700 transition duration-300"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Header;