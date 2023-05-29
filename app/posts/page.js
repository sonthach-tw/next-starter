"use client"
import {useEffect, useState} from "react";
import {firestore} from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
export default function PostsIndex() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'posts'), (snapshot) => {
            const updatedMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(updatedMessages.sort((a, b) => b.timestamp - a.timestamp));
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Posts</h2>
            {posts.map(post => (
                <div key={post.id} className="bg-white rounded shadow p-4 mb-4">
                    <h3 className="text-lg font-bold mb-2 text-black">{post.title}</h3>
                    <p className="text-gray-700">{post.content}</p>
                </div>
            ))}
        </div>
    );
}