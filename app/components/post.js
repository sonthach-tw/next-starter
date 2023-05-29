import { useRouter } from 'next/navigation';

const Post = ({ id, title, content, votes, handleUpvote, handleDownvote }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/posts/${id}`);
    };

    return (
        <div className="bg-white rounded shadow p-4 mb-4 cursor-pointer" onClick={handleClick}>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-700">{content}</p>
            <div className="flex items-center mt-4">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={event => {
                        event.stopPropagation();
                        handleUpvote();
                    }}
                >
                    Upvote
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={event => {
                        event.stopPropagation();
                        handleDownvote();
                    }}
                >
                    Downvote
                </button>
            </div>
            <p className="text-gray-600 text-sm">Votes: {votes}</p>
        </div>
    );
};

export default Post;