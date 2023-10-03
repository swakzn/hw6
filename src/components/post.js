import React from "react";

const Post = (props) => {
    const handleDeleteClick = () => {
        props.deletePost(props.id);
    };

    return (
        <div className="post-card">
            <h2 className="post-title">{props.title}</h2>
            <img src={props.imagesUrl} alt="Котик" className="cat-image" />
            <p className="post-body">{props.body}</p>
            <button className="btn-delete" onClick={handleDeleteClick}>
                delete
            </button>
        </div>
    );
};

export default Post;





