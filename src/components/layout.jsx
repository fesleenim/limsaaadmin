import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Drawer, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { TbCategory } from "react-icons/tb";
import { TbBrandSketch } from "react-icons/tb";
import { RxBoxModel } from "react-icons/rx";
import { PiCityThin } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { IoCarOutline } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";


function Layout() {
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar (Drawer) */}
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        backgroundColor: '#f4f6f8',
                        padding: '20px',
                    },
                }}
            >
                <Typography variant="h6" sx={{ marginBottom: 3, fontWeight: 'bold' }}>Admin Panel</Typography>
                <NavLink
                    to="/"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <TbCategory className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Categories
                        </button>
                    )}
                </NavLink>

                <NavLink
                    to="/brands"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <TbBrandSketch className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Brands
                        </button>
                    )}
                </NavLink>

                <NavLink
                    to="/models"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <RxBoxModel className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Models
                        </button>
                    )}
                </NavLink>

                <NavLink
                    to="/city"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <PiCityThin className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            City
                        </button>
                    )}
                </NavLink>

                <NavLink
                    to="/location"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <IoLocationOutline className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Location
                        </button>
                    )}
                </NavLink>

                <NavLink
                    to="/cars"
                    className="block mb-2.5"
                >
                    {({ isActive }) => (
                        <button
                            className={`flex items-center px-5 py-2 rounded-lg w-full ${isActive
                                ? ' text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`}
                        >
                            <IoCarOutline className={` mr-3 ${isActive
                                ? '  text-violet-950 font-medium '
                                : 'text-gray-600  hover:text-gray-900'
                                }`} />
                            Cars
                        </button>
                    )}
                </NavLink>

            </Drawer>


            {/* Main content area */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100vh' }}>
                {/* AppBar */}
                <AppBar position="fixed" sx={{ backgroundColor: '#000957', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Admin Panel
                        </Typography>
                        <button className=" text-white px-5 py-2 rounded-lg  " onClick={Logout}>
                        <IoExitOutline className='text-3xl'/>
                        </button>
                    </Toolbar>
                </AppBar>

                {/* Content Area */}
                <Box sx={{ flexGrow: 1, overflow: 'auto', padding: 3, marginTop: '64px', bgcolor: '#0u9u4' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;
