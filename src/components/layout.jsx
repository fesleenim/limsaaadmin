import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button, Drawer, AppBar, Toolbar, Typography, Box } from '@mui/material';

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
                <NavLink to="/" className="block mb-2.5">
                    <button className="bg-[#493D9E] text-white px-5 py-2 rounded-lg w-full hover:bg-[#3b2b78]">
                        Categories
                    </button>
                </NavLink>
                <NavLink to="/brands" className="block mb-2.5">
                    <button className="bg-[#493D9E] text-white px-5 py-2 rounded-lg w-full hover:bg-[#3b2b78]">
                        Brands
                    </button>
                </NavLink>

            </Drawer>

            {/* Main content area */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100vh' }}>
                {/* AppBar */}
                <AppBar position="fixed" sx={{ backgroundColor: '#493D9E', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Admin Panel
                        </Typography>
                        <button className="bg-[#B2A5FF] text-white px-5 py-2 rounded-lg  hover:bg-[#3b2b78]" onClick={Logout}>
                            Log out
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
