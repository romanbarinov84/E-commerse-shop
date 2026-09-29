'use client';

import { SubmitEvent, useEffect, useState } from 'react';

type Product = {
    id: string;
    text: string;
};

export default function Home() {
    const [comment, setComment] = useState<Product[]>([]);
    const [newCommentText, setNewCommentText] = useState('');

    async function loadComments() {
        const res = await fetch('/api/products');
        const data = await res.json();

        setComment(data);
    }

    useEffect(() => {
        const result = () => loadComments();
        result();
    }, []);

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();
        const response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify({ text: newCommentText }),
        });
        if (response.ok) {
            setNewCommentText('');
            loadComments();
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-red-400">
                Products
                <ul className="mb-6">
                    {comment.map((comment) => (
                        <li
                            key={comment.id}
                            className="mb-3 p-2 border rounded-sm"
                        >
                            <span className="text-blue-300">
                                {comment.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </h2>
            <div className="text-center">
                <h2 className="text-2xl text-green-300 font-bold">
                    Добавить коментарий
                </h2>
            </div>
            <form
                onSubmit={handleSubmit}
                className="border-gray-300 border-2 rounded-sm mx-3"
            >
                <input
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="border-gray-400 rounded-sm m-5 p-3 flex-1 bg-gray-300"
                    type="text"
                    placeholder="ваш коментарий"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-300 text-white px-4 py-3 rounded-sm "
                >
                    SEND
                </button>
            </form>
        </>
    );
}
