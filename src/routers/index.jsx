import { createBrowserRouter } from "react-router-dom";
import App from "../App";  
import LoginPage from "../pages/login";
import Category from "../pages/catagory";
import Brands from "../pages/Brands/Brands";


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
            }
        ]
    }
]);
