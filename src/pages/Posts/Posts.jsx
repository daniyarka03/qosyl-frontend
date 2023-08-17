import React from 'react'
import styles from "./Posts.module.sass";
import Navbar from '../../components/Navbar/Navbar';
import PostCard from "../../components/PostCard/PostCard"
import { useNavigate } from "react-router-dom";



const Posts = () => {
  const navigate = useNavigate()
  return (
    <div>
        <Navbar/>
        <div className={styles.container}>
            <p className={styles.header}>Посты</p>
            <button className={styles.post__add} onClick={() => navigate("/create-post")}>Новый пост</button>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
        </div>
    </div>
  )
}

export default Posts