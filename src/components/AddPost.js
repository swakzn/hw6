import React, { useState } from "react";

function AddPost(props) {
    const [post, setPost] = useState({ title: "", body: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addPost(post.title, post.body);
        setPost({ title: "", body: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add new post</h2>
            <div className="input-container">
                <label htmlFor="title">Title</label>
                <input
                    name="title"
                    type="text"
                    value={post.title}
                    onChange={handleChange}
                />
            </div>
            <div className="input-container">
                <label htmlFor="body">Text</label>
                <input
                    name="body"
                    type="text"
                    value={post.body}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn-submit">
                Add Post
            </button>
        </form>
    );
}

export default AddPost;