import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Book() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [readChapters, setReadChapters] = useState([]);

    useEffect(() => {
        getBookDetails();
        getChapters();
        getReadChapters();
    }, [id]);

    const getBookDetails = () => {
        axiosClient
            .get(`/api/books/${id}`)
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
        axiosClient
            .get(`/api/books/${id}/chapters`)
            .then(({ data }) => {
                setChapters(data.data || []);
            })
            .catch((error) => {
                console.error("Failed to fetch chapters:", error);
            });
    };

    const getReadChapters = () => {
        axiosClient
            .get(`/api/books/${id}/read-chapters`)
            .then(({ data }) => {
                setReadChapters(data || []);
            })
            .catch((error) => {
                console.error("Failed to fetch read chapters:", error);
            });
    };

    const markChapterAsRead = (chapterId) => {
        axiosClient
            .post(`/api/books/${id}/chapters/${chapterId}/read`)
            .then(() => {
                setReadChapters((prevReadChapters) => [...prevReadChapters, chapterId]);
            })
            .catch((error) => {
                console.error("Failed to mark chapter as read:", error);
            });
    };

    const handleChapterClick = (chapterId) => {
        if (!readChapters.includes(chapterId)) {
            markChapterAsRead(chapterId);
        }
    };

    // Function to handle adding a new chapter
    const handleAddChapter = () => {
        navigate(`/${book.title}/${id}/chapter/create`);
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
                            <img
                                src={book.book_cover}
                                alt={`Cover of ${book.title}`}
                                className="w-full h-64 object-cover mt-4"
                            />
                            <p className="text-gray-800 mt-4">{book.description}</p>
                        </div>
                    )}

                    <div className="chapter-list mt-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Chapters</h2>
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
                                    <li
                                        key={chapter.id}
                                        className={`${
                                            readChapters.includes(chapter.id)
                                                ? "text-gray-500"
                                                : "text-blue-600 hover:underline"
                                        }`}
                                    >
                                        <Link
                                            to={`/${book.title}/${id}/chapter/${chapter.id}`}
                                            onClick={() => handleChapterClick(chapter.id)}
                                        >
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
