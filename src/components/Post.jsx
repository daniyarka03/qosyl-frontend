import React from 'react';
import './css/Post.css';
const Post = ({className, data, key}) => {
    return (
        <div className={className + ' post'} key={key} >
            <h2>{data.username}</h2>
            <p >{data.text}</p>
            <div className="row">
                <span>Likes: {data.count_likes}</span>
                <span> / </span>
                <span>Comments: {data.count_comments}</span>
            </div>
        </div>
    );
};

export default Post;