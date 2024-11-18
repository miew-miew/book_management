import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

function AnimationBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        getBooks();
    }, []);

    useEffect(() => {
        if (books.length > 0) {
            const intervalId = setInterval(() => {
                setIsAnimating(true);
                setTimeout(() => {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
                    setIsAnimating(false);
                }, 500);
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [books]);

    const getBooks = () => {
        axiosClient.get('/api/books')
            .then(({ data }) => {
                setLoading(false);
                setBooks(data.data.slice(0, 6));
                setCurrentIndex(0);
            })
            .catch((error) => {
                console.error("Failed to fetch books:", error);
                setLoading(false);
            });
    };

    const handleBookClick = (index) => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsAnimating(false);
        }, 500);
    };

    return (
        <div>
            <div className="md:hidden px-4">
                {loading ? (
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col p-4 justify-end w-[82vw] h-[60vh] bg-blue-500 rounded-xl">
                            <span className="text-[2rem] font-bold text-white">Title</span>
                            <span className="text-white">Description</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <div className="flex flex-row gap-4">
                            {books.slice(0, 4).map((book) => (
                                <div key={book.id}>
                                    <Link to={`/book/${book.id}`}>
                                        <div className="flex flex-col p-4 justify-end w-[82vw] h-[60vh] bg-blue-500 rounded-xl">
                                            <span className="text-[2rem] font-bold text-white">{book.title}</span>
                                            <span className="text-white">{book.description}</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="hidden md:block ">
                <div className="flex flex-row gap-8 items-stretch">
                    <div className="bg-blue-500 rounded-2xl flex flex-col md:w-[75vw] xl:w-[53vw] justify-end">
                        {books.length > 0 && !loading ? (
                            <Link to={`/book/${books[currentIndex].id}`} className="md:w-[75vw] xl:w-[53vw]">
                                <div
                                    className={`transition-opacity duration-500 ${
                                        isAnimating ? "opacity-0" : "opacity-100"
                                    }`}
                                >
                                    <img
                                        src={books[currentIndex].image}
                                        alt={books[currentIndex].title}
                                        className="w-full h-full object-fill rounded-xl mb-4"
                                    />
                                </div>
                                <div
                                    className={`flex flex-col gap-2 transition-opacity duration-500 p-4 z-20 ${
                                        isAnimating ? "opacity-0" : "opacity-100"
                                    }`}
                                >
                                    <span className="text-white font-bold text-[2rem] uppercase">
                                        {books[currentIndex].title}
                                    </span>
                                    <span className="text-white">
                                        {books[currentIndex].description.length > 90
                                            ? `${books[currentIndex].description.slice(0, 90)}...`
                                            : books[currentIndex].description}
                                    </span>
                                </div>
                            </Link>
                        ) : (
                            <div className="bg-white rounded-2xl p-4 h-full"></div>
                        )}
                    </div>
                    {loading ? (
                        <div className="flex flex-col gap-6 h-full">
                            <div className="flex flex-row gap-10 items-center p-2 w-[20vw] h-[15vh] bg-white rounded-xl relative overflow-hidden">
                                <div className="w-[6vw] bg-white h-[13vh] rounded-md"></div>
                                <span className="text-white text-[1rem] font-bold">Title</span>
                            </div>
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="w-[20vw] h-[15vh] bg-white rounded-xl"></div>
                            ))}
                        </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <div className="flex flex-col gap-4">
                                    {books.slice(0, 6).map((book, index) => (
                                        <div key={book.id} className="relative">
                                            <div
                                                onClick={() => handleBookClick(index)}
                                                className={`cursor-pointer flex flex-row gap-4 items-center p-2 w-[20vw] h-[11vh] rounded-xl relative overflow-hidden ${
                                                    currentIndex === index ? "bg-[#28282C]" : "bg-transparent"
                                                }`}
                                            >
                                                <div className="w-[3.2vw] bg-white h-[20vh] lg:h-[10vh] rounded-md">
                                                    <img 
                                                        src={book.image} 
                                                        alt={book.title} 
                                                        className="object-cover w-full h-full rounded-md"
                                                    />
                                                </div>
                                                <span className="text-white text-[1rem] font-bold">{book.title}</span>
                                                {currentIndex === index && (
                                                    <div className="absolute top-0 left-0 h-full w-full bg-white/20 animate-slide-in"></div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default AnimationBooks;
