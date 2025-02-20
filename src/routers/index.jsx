import { createBrowserRouter } from "react-router-dom";
import App from "../App";  
import LoginPage from "../pages/login";
import Category from "../pages/catagory";
import Brands from "../pages/Brands/Brands";
import Models from "../pages/Models/models";
import Cities from "../pages/cities/cities";
import Location from "../pages/location/location";
import Cars from "../pages/cars/cars";


export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,  // Bosh sahifa
        errorElement: <div>Bunday sahifa mavjud emas!</div>,
        children: [
            {
                path: "/",  // Category sahifasi
                element: <Category/>,
            },
            {
                path: "/login",
                element: <LoginPage/>,  // Foydalanuvchi kirish sahifasi
            },
            {
                path: "/brands",  // Brands sahifasi
                element: <Brands/>,
            },
            {
                path: "/models",  // Brands sahifasi
                element: <Models/>,
            },
            {
                path: "/city",  // Brands sahifasi
                element: <Cities/>,
            },
            {
                path: "/location",  // Brands sahifasi
                element: <Location/>,
            },
            {
                path:"/cars" ,
                element : <Cars/>
            }
        ]
    }
]);
