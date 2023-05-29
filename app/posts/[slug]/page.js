"use client"
import {firestore} from "../../firebase";
import { collection, addDoc, onSnapshot, updateDoc, doc, increment } from "firebase/firestore";
import Post from "../../components/post";
import {useEffect, useState} from "react";
export default function Page({ params }) {
    const slug = params.slug;
    const [post, setPost] = useState(null);
    function handleVote(id, upvote) { // TODO: Refactor
        const postsCollection = collection(firestore, 'posts');
        const postDoc = doc(postsCollection, id);
        updateDoc(postDoc, {
            votes: upvote === 'upvote' ? increment(1) : increment(-1)
        });
    }
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
            handleUpvote={() => handleVote(post.id, 'upvote')}
            handleDownvote={() => handleVote(post.id, 'downvote')}
        />}
    </h1>;
}