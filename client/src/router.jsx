import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import GuestLayout from "./Layouts/GuestLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Book from "./Pages/Book";
import BookForm from "./Pages/BookForm";
import Chapter from "./Pages/Chapter";
import ChapterForm from "./Pages/ChapterForm";

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
                path: '/:book/:id',
                element: <Book/>
            },
            {
                path: '/book/create',
                element: <BookForm/>
            },
            {
                path: '/:book/:id/chapter/:chapterId',
                element: <Chapter/>
            },
            {
                path: '/:book/:id/chapter/create',
                element: <ChapterForm/>
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