import {
    createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import Main from "../layout/Main";
import Home from "../Page/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            }
        ]
    },
]);