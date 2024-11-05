import { useEffect, useState } from "react";
import axiosClient from "../axios-client"

export default function Home () {

    const [books, setBooks] = useState([])

    useEffect(() => {
        getBooks()
    })

    const getBooks = () => {
        axiosClient.get('/api/books')
        .then(({data}) => {
            setBooks(data.data)
        })
        .catch(() => {

        })
    }

    return (
        <div>
            <h1 className="text-lg">Latests Books</h1>
        </div>
    );
};