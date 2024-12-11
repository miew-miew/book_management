import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import AnimationBooks from '../Components/AnimationBooks'
import AllBooks from '../Components/AllBooks'

export default function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = () => {
        axiosClient.get('/api/books')
            .then(({ data }) => {
                setLoading(false)
                setBooks(data.data)
            })
            .catch((error) => {
                console.error("Failed to fetch books:", error);
                setLoading(false);
            })
    };

    return (
        <div className="flex flex-col items-center overflow-hidden min-h-screen">
            {/* <h1 className="text-lg">Latest Books</h1> */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <AnimationBooks />
                    <AllBooks />
                </div>
                
            )}
        </div>
    );
};
