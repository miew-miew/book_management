// Chapter.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Chapter() {
    const { id, chapterId } = useParams();
    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get(`/api/books/${id}/chapters/${chapterId}`)
            .then(({ data }) => {
                setChapter(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch chapter details:", error);
                setLoading(false);
            });
    }, [id, chapterId]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h1 className="text-2xl font-bold">{chapter.title}</h1>
                    <p className="text-gray-800 mt-4">{chapter.content}</p>
                </div>
            )}
        </div>
    );
}