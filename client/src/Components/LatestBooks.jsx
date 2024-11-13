import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

function LatestBooks() {
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
        <div className="flex flex-col gap-4 pt-16">
                <span className="font-semibold">Latest Book</span>
                {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {books.length > 0 ? (
                        books.map(book => (
                            <div key={book.id} className="border p-4 rounded shadow-md">
                                <Link to={`/book/${book.id}`}>
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
                <div className="flex flex-row gap-6">
                    <div className="flex flex-col gap-2 items-start">
                        <div className="w-[40vw] xl:w-[16vw] h-[35vh] xl:h-[40vh] bg-blue-500 rounded-xl"></div>
                        <img src={book.book_cover} alt={`Cover of ${book.title}`} className="w-[40vw] xl:w-[16vw] h-[35vh] xl:h-[40vh] bg-blue-500 rounded-xl" />
                        <div className="flex flex-col gap-1">
                            <span>by {book.author}</span>
                            <span className="font-bold text-[1.3rem] ">{book.title}</span>
                        </div>
                        <button className="bg-red-400 px-4 py-1 rounded-full text-white">Read</button>
                    </div>
                    {/* 2 */}
                    <div className="flex flex-col gap-2 items-start">
                        <div className="w-[40vw] xl:w-[16vw] h-[35vh] xl:h-[40vh] bg-blue-500 rounded-xl"></div>
                        <div className="flex flex-col gap-1">
                            <span>Author</span>
                            <span className="font-bold text-[1.3rem] ">Title</span>
                        </div>
                        <button className="bg-red-400 px-4 py-1 rounded-full text-white">Read</button>
                    </div>
                    {/* 3 */}
                    <div className="flex flex-col gap-2 items-start">
                        <div className="w-[40vw] xl:w-[16vw] h-[35vh] xl:h-[40vh] bg-blue-500 rounded-xl"></div>
                        <div className="flex flex-col gap-1">
                            <span>Author</span>
                            <span className="font-bold text-[1.3rem] ">Title</span>
                        </div>
                        <button className="bg-red-400 px-4 py-1 rounded-full text-white">Read</button>
                    </div>
                    {/* 4 */}
                    <div className="flex flex-col gap-2 items-start">
                        <div className="w-[40vw] xl:w-[16vw] h-[35vh] xl:h-[40vh] bg-blue-500 rounded-xl"></div>
                        <div className="flex flex-col gap-1">
                            <span>Author</span>
                            <span className="font-bold text-[1.3rem] ">Title</span>
                        </div>
                        <button className="bg-red-400 px-4 py-1 rounded-full text-white">Read</button>
                    </div>
                    {/* 5    */}
                    <div className="flex flex-col gap-2 items-start">
                        <div className="w-[40vw] xl:w-[16vw] h-[35vh] xl:h-[40vh] bg-blue-500 rounded-xl"></div>
                        <div className="flex flex-col gap-1">
                            <span>Author</span>
                            <span className="font-bold text-[1.3rem] ">Title</span>
                        </div>
                        <button className="bg-red-400 px-4 py-1 rounded-full text-white">Read</button>
                    </div>
                </div>
        </div>
    );
}

export default LatestBooks;