"use client"
import {useEffect, useState} from "react";
import {firestore} from "../firebase";
import { collection, addDoc, onSnapshot, updateDoc, doc, increment } from "firebase/firestore";
import Post from "../components/post";

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

    function handleVote(id, upvote) {
        const postsCollection = collection(firestore, 'posts');
        const postDoc = doc(postsCollection, id);
        updateDoc(postDoc, {
            votes: upvote === 'upvote' ? increment(1) : increment(-1)
        });
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Posts</h2>
            {posts.map(post => (
                <Post
                    id={post.id}
                    key={post.id}
                    title={post.title}
                    content={post.content}
                    votes={post.votes}
                    handleUpvote={() => handleVote(post.id, 'upvote')}
                    handleDownvote={() => handleVote(post.id, 'downvote')}
                />
            ))}
        </div>
    );

}