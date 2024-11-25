import { useState } from "react";
import Input from "../Components/Input";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";

export default function BookForm() {
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        description: ''
    });
    const [bookCover, setBookCover] = useState(null);
    const [chapters, setChapters] = useState([{ title: '', content: '' }]); // Initial state for chapters
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setBookCover(e.target.files[0]);
    };

    const handleChapterChange = (index, field, value) => {
        const newChapters = [...chapters];
        newChapters[index][field] = value;
        setChapters(newChapters);
    };

    const addChapter = () => {
        setChapters([...chapters, { title: '', content: '' }]);
    };

    const removeChapter = (index) => {
        const newChapters = chapters.filter((_, i) => i !== index);
        setChapters(newChapters);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        // Filtrer les chapitres vides
        const filteredChapters = chapters.filter(
            (chapter) => chapter.title.trim() || chapter.content.trim()
        );

        // Construire les données
        const data = {
            title: bookData.title,
            author: bookData.author,
            description: bookData.description,
            chapters: filteredChapters, // Inclure uniquement les chapitres valides
        };

        // Ajouter les données au FormData pour inclure l'image
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "chapters") {
                value.forEach((chapter, index) => {
                    Object.entries(chapter).forEach(([chapterKey, chapterValue]) => {
                        formData.append(`chapters[${index}][${chapterKey}]`, chapterValue);
                    });
                });
            } else {
                formData.append(key, value);
            }
        });

        if (bookCover) {
            formData.append("book_cover", bookCover);
        }

        // Envoi des données
        try {
            await axiosClient.post("/api/books", formData);
            setLoading(false);
            navigate("/");
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors || "An error occurred");
            }
            console.error("Failed to save book:", error);
        }
    };
    
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input    
                    type="text" 
                    placeholder="Title" 
                    value={bookData.title} 
                    onChange={(e) => setBookData({...bookData, title: e.target.value})} 
                />
                <Input    
                    type="text" 
                    placeholder="Author" 
                    value={bookData.author} 
                    onChange={(e) => setBookData({...bookData, author: e.target.value})} 
                />
                <textarea 
                    placeholder="Description" 
                    value={bookData.description} 
                    onChange={(e) => setBookData({...bookData, description: e.target.value})}
                    className="w-full p-2 border rounded-md" 
                    rows="4"
                />
                <div>
                    <label className="block mb-2 font-semibold">Book Cover</label>
                    <input 
                        type="file" 
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-600 file:text-white
                        hover:file:bg-blue-500"
                    />
                </div>

                {/* Chapter Section */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Chapters</h3>
                    {chapters.map((chapter, index) => (
                        <div key={index} className="mb-4">
                            <Input 
                                type="text" 
                                placeholder="Chapter Title" 
                                value={chapter.title}
                                onChange={(e) => handleChapterChange(index, 'title', e.target.value)}
                            />
                            <textarea 
                                placeholder="Chapter Content" 
                                value={chapter.content}
                                onChange={(e) => handleChapterChange(index, 'content', e.target.value)}
                                className="w-full p-2 border rounded-md mt-2" 
                                rows="3"
                            />
                            <button 
                                type="button" 
                                onClick={() => removeChapter(index)} 
                                className="text-red-600 hover:underline mt-2"
                            >
                                Remove Chapter
                            </button>
                        </div>
                    ))}
                    <button 
                        type="button" 
                        onClick={addChapter} 
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400"
                    >
                        Add Chapter
                    </button>
                </div>

                {errors && (
                    <div className="bg-red-500 text-white p-3 mb-3 rounded">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                <button 
                    type="submit" 
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 ${loading ? 'opacity-50' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Add Book'}
                </button>
            </form>
        </div>
    );
};