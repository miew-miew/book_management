import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Book() {
    const { id } = useParams();  
    const [book, setBook] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBookDetails();
        getChapters();
    }, [id]);

    const getBookDetails = () => {
        axiosClient.get(`/api/books/${id}`)
            .then(({ data }) => {
                setBook(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch book details:", error);
                setLoading(false);
            });
    };

    const getChapters = () => {
        axiosClient.get(`/api/books/${id}/chapters`)
            .then(({ data }) => {
                setChapters(data.data || []); // Ensure chapters is an array
            })
            .catch((error) => {
                console.error("Failed to fetch chapters:", error);
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

                    {/* Chapter list */}
                    <div className="chapter-list mt-6">
                        <h2 className="text-xl font-bold">Chapters</h2>
                        <ul className="mt-4 space-y-2">
                            { chapters ? 
                                (chapters.map((chapter) => (
                                    <li key={chapter.id} className="text-blue-600 hover:underline">
                                        <Link to={`/books/${id}/chapters/${chapter.id}`}>
                                            {chapter.title}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <p>No chapters available</p>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
