import React from 'react'
import styles from "./Posts.module.sass";
import Navbar from '../../components/Navbar/Navbar';
import PostCard from "../../components/PostCard/PostCard"

const Posts = () => {
  return (
    <div>
        <Navbar/>
        <div className={styles.container}>
            <p className={styles.header}>ПОСТЫ</p>
            <button className={styles.post__add}>Новый пост</button>
            <PostCard/>
            <PostCard/>
            <PostCard/>
        </div>
    </div>
  )
}

export default Posts