import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Book() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [readChapters, setReadChapters] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        getBookDetails();
        getChapters();
        getReadChapters();
        getComments();
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

    const getComments = () => {
        axiosClient
            .get(`/api/books/${id}/comments`)
            .then(({ data }) => {
                setComments(data.data || []);
            })
            .catch((error) => {
                console.error("Failed to fetch comments:", error);
            });
    };

    const addComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        axiosClient
            .post(`/api/books/${id}/comments`, { content: newComment })
            .then(({ data }) => {
                setComments((prevComments) => [data.data, ...prevComments]);
                setNewComment("");
            })
            .catch((error) => {
                console.error("Failed to add comment:", error);
            });
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Left Section: Book Details */}
            <div className="flex-1 px-10 lg:px-40 pt-10">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="book-details">
                        {book && (
                            <div>
                                <h1 className="text-[20px] md:text-[3rem] font-bold text-white">{book.title}</h1>
                                <p className="text-lg font-semibold text-[#CFCFD0]">by {book.author}</p>
                                <img src={book.book_cover} alt={`Cover of ${book.title}`} className="w-full h-[55vh] bg-white rounded-xl object-cover mt-4" />
                                <p className="mt-4 text-white">{book.description}</p>
                            </div>
                        )}

                        {/* Chapter list with add button */}
                        <div className="chapter-list mt-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">Chapters</h2>
                                <button 
                                    onClick={() => navigate(`/${book.title}/${id}/chapter/create`)}
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
                                            className={
                                                readChapters.includes(chapter.id)
                                                    ? "text-gray-500"
                                                    : "text-blue-600 hover:underline"
                                            }
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
                                    <p className="text-white">No chapters available</p>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Section: Comments */}
            <div className=" bg-gray-800 p-6 rounded-lg mx-10 md:mx-40 mt-10">
                <h2 className="text-xl font-bold text-white mb-4">Comments</h2>
                
                {/* Form to Add Comment */}
                <form onSubmit={addComment} className="mb-6 flex items-start space-x-4">
                    <div className="flex-1">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment..."
                            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white resize-none"
                            rows="2"
                        />
                        <button
                            type="submit"
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Add Comment
                        </button>
                    </div>
                </form>

                {/* Comment List */}
                <ul className="space-y-6">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <li key={comment.id} className="flex items-start space-x-4">
                                {/* Comment Content */}
                                <div className="flex-1 bg-gray-700 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <p className="text-white font-bold">{comment.user.name}</p>
                                        <span className="text-sm text-gray-400">{(comment.created_at)}</span>
                                    </div>
                                    <p className="text-white mt-2">{comment.content}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-400">No comments yet.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
