import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import GuestLayout from "./Layouts/GuestLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Book from "./Pages/Book";
import BookForm from "./Pages/BookForm";
import Chapter from "./Pages/Chapter";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/book/:id',
                element: <Book/>
            },
            {
                path: '/book/create',
                element: <BookForm/>
            },
            {
                path: '/books/:id/chapters/:chapterId',
                element: <Chapter/>
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
        ]
    }
]);

export default router;