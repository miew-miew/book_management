import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

function AllBooks() {
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
        <div className="flex flex-col gap-6 pt-14 px-4">
                <div className="flex flex-row items-end gap-2">
                    <span className="font-bold text-[1.3rem] text-white">All Book</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>

                {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {books.length > 0 ? (
                            books.map(book => (
                                <div key={book.id} className="w-[40vw] md:w-[22vw] lg:w-[15vw] xl:w-[14vw]">
                                    <Link to={`/book/${book.id}`}>
                                    <div className="flex flex-col w-[40vw] md:w-[22vw] lg:w-[15vw] xl:w-[14vw] gap-3 items-start pb-16">
                                        <div className="w-[40vw] md:w-[22vw] lg:w-[15vw] xl:w-[14vw] h-[35vh] md:h-[45vh] lg:h-[35vh] xl:h-[40vh] rounded-lg shadow-md bg-white/20">
                                            <img src={book.book_cover} alt={`Cover of ${book.title}`} className="object-cover w-full h-full rounded-lg" />
                                        </div>
                                        <div className="flex flex-col gap-1 pb-2 h-[12vh] xl:h-[13vh]">
                                            <span className="text-[#ffffffa6] ">by {book.author}</span>
                                            <span className="font-bold text-[1.2rem] text-white">
                                                {book.title.length > 35 ? `${book.title.slice(0, 35)}...` : book.title}
                                            </span>
                                        </div>
                                        <button className="bg-[#26BBFF] px-3 py-1 rounded-full text-black mt-auto text-[0.8rem] ">Read</button> {/* Utilise mt-auto ici */}
                                    </div>

                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No books available.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllBooks;