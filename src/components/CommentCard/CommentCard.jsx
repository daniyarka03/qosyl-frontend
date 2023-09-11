import React, { useEffect, useState } from "react";
import styles from "./CommentCard.module.sass";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import { usersAPI } from "../../constants/API";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { useNavigate } from "react-router-dom";
const CommentCard = ({ comment }) => {
  const navigate = useNavigate();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState({});
  const { currentUser } = useGetCurrentUser(setIsUserLoading);

  useEffect(() => {
    axios.get(usersAPI + `${comment.author_id}`).then((data) => {
      setUser(data.data);
      setIsUserLoading(false);
    });
  }, []);

  const navigateToAuthor = () => {
    if (currentUser.user_id === comment.author_id) navigate("/profile");
    else navigate(`/user/${comment.author_id}`);
  };

  return (
    <div className={styles.post}>
      <div className={styles.wrapper}>
        <div className={styles.post__creator}>
          <img
            onClick={navigateToAuthor}
            className={styles.post__creator__avatar}
            src={`${import.meta.env.VITE_SERVER_URL_MEDIA}${user.avatar}`}
          />
          <p className={styles.post__creator__name} onClick={navigateToAuthor}>
            {user.name}
          </p>
        </div>
        <p className={styles.post__description}>{comment.message}</p>
      </div>
    </div>
  );
};

export default CommentCard;
