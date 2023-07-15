import React from 'react';
import './css/Post.css';
const Post = ({className, data, key, deletePost, likePost}) => {
    return (
        <div className={className + ' post'} key={key} >
            <h2>{data.username}</h2>
            <p >{data.text}</p>
            <div className="row">
                <span>Likes: {data.count_likes}</span>
                <span> / </span>
                <span>Comments: {data.count_comments}</span>
            </div>
            <div className="actions">
                <button className="button button__like" onClick={likePost}>Like</button>
                <button className="button button__comment">Comment</button>
                <button className="button button__delete" onClick={deletePost}>Delete</button>
            </div>
        </div>
    );
};

export default Post;