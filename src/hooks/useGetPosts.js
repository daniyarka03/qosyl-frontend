import { useState, useEffect } from "react";
import axios from "axios";
import { postsAPI } from "../constants/API";

const useGetPosts = (setIsPostLoading) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(postsAPI).then((data) => {
      setPosts(data.data);
      setIsPostLoading(false);
    });
  }, []);
  const handleDeletePost = (deletedPostID) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.post_id !== deletedPostID)
    );
  };
  return { posts, handleDeletePost };
};

export default useGetPosts;
