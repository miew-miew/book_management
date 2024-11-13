import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Book() {
    const { id } = useParams();
    const navigate = useNavigate();
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
                setChapters(data.data || []);
            })
            .catch((error) => {
                console.error("Failed to fetch chapters:", error);
            });
    };

    // Function to handle adding a new chapter
    const handleAddChapter = () => {
        navigate(`/books/${id}/chapters/new`);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="book-details px-40 pt-20">
                    {book && (
                        <div>
                            <h1 className="text-[3rem] font-bold text-white">{book.title}</h1>
                            <p className="text-lg font-semibold text-[#CFCFD0] ">by {book.author}</p>
                            <img src={book.book_cover} alt={`Cover of ${book.title}`} className="w-full h-[50vh] bg-white rounded-xl object-cover mt-4" />
                            <p className="mt-4 text-white">{book.description}</p>
                        </div>
                    )}

                    {/* Chapter list with add button */}
                    <div className="chapter-list mt-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Chapters</h2>
                            <button 
                                onClick={handleAddChapter}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Add Chapter
                            </button>
                        </div>
                        <ul className="mt-4 space-y-2">
                            {chapters.length > 0 ? (
                                chapters.map((chapter) => (
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
