import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Book() {
    const { id } = useParams();  
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBookDetails();
    }, [id]);

    const getBookDetails = () => {
        axiosClient.get(`/api/books/${id}`)
            .then(({ data }) => {
                setLoading(false);
                setBook(data.data);
            })
            .catch((error) => {
                console.error("Failed to fetch book details:", error);
                setLoading(false);
            });
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="book-details">
                    {book && (
                        <div>
                            <h1 className="text-2xl font-bold">{book.title}</h1>
                            <p className="text-lg font-semibold">by {book.author}</p>
                            <img src={book.book_cover} alt={`Cover of ${book.title}`} className="w-full h-64 object-cover mt-4" />
                            <p className="text-gray-800 mt-4">{book.description}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
