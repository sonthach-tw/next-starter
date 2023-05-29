"use client"
import {firestore} from "../../firebase";
import { collection, addDoc, onSnapshot, updateDoc, doc, increment } from "firebase/firestore";
import Post from "../../components/post";
import {useEffect, useState} from "react";
export default function Page({ params }) {
    const slug = params.slug;
    const [post, setPost] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(firestore, 'posts', slug), (doc) => {
            setPost({
                id: doc.id,
                ...doc.data(),
            });
        });
        return () => unsubscribe();
    },[])
    return <h1>
        {post && <Post
            id={post.id}
            key={post.id}
            title={post.title}
            content={post.content}
            votes={post.votes}
        />}
    </h1>;
}