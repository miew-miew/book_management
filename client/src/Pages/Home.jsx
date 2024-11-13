import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

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
        <div>
            <h1 className="text-lg">Latest Books</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {books.length > 0 ? (
                        books.map(book => (
                            <div key={book.id} className="border p-4 rounded shadow-md">
                                <Link to={`/${book.title}/${book.id}`}>
                                    <h2 className="text-xl font-bold italic">{book.title}</h2>
                                    <p className="text-sm font-semibold text-green-800">by {book.author}</p>
                                    <img src={book.book_cover} alt={`Cover of ${book.title}`} className="w-full h-48 object-cover mt-2"/>                            
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No books available.</p>
                    )}
                </div>
            )}
        </div>
    );
};
