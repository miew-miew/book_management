import { useState } from "react";
import Input from "../Components/Input";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from "react-router-dom";

export default function ChapterForm() {
    const { id } = useParams();
    const [chapterData, setChapterData] = useState({
        title: '',
        content: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const handleChapterChange = (field, value) => {
        setChapterData({ ...chapterData, [field]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        try {
            // Envoi des données du chapitre
            await axiosClient.post(`/api/books/${id}/chapters`, chapterData);
            setLoading(false);
            navigate(`/books/${id}`);
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors);
                console.error("Failed to save chapter:", error);
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Add a New Chapter</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Chapter Details</h3>
                    <Input 
                        type="text" 
                        placeholder="Chapter Title" 
                        value={chapterData.title}
                        onChange={(e) => handleChapterChange('title', e.target.value)}
                    />
                    <textarea 
                        placeholder="Chapter Content" 
                        value={chapterData.content}
                        onChange={(e) => handleChapterChange('content', e.target.value)}
                        className="w-full p-2 border rounded-md mt-2" 
                        rows="3"
                    />
                </div>

                {errors && (
                    <div className="bg-red-500 text-white p-3 mb-3 rounded">
                        <p>{errors.title?.[0]}</p>
                        <p>{errors.content?.[0]}</p>
                    </div>
                )}

                <button 
                    type="submit" 
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 ${loading ? 'opacity-50' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Chapter'}
                </button>
            </form>
        </div>
    );
}
