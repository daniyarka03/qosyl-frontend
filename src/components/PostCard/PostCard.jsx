import React, { useEffect, useState } from "react";
import styles from "./PostCard.module.sass";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import likeIconUnfilled from "../../assets/like-outline-icon.svg";
import likeIconFilled from "../../assets/like-icon.svg";
import commentIcon from "../../assets/comment-icon.svg";
import { useCurrentUserData } from "../../actions/getCurrentUserData";
import 'react-loading-skeleton/dist/skeleton.css'
import { usersAPI } from "../../constants/API";
import CardSkeleton from "../CardSkeleton/CardSkeleton";

const PostCard = ({
  isUserPost,
  onDelete,
  isComment,
  post,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likesArray, setLikesArray] = useState([]); // Массив лайков [строка
  const [postData, setPostData] = useState(null); // Данные поста [объект
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const postID = post.post_id;
  const deletePostURL = `${
    import.meta.env.VITE_SERVER_URL
  }/api/posts/${postID}/delete/`;
  const postURL = `${import.meta.env.VITE_SERVER_URL}/api/posts/${postID}`;
  const { userID } = useCurrentUserData();
  const deletePost = () => {
    axios
      .delete(deletePostURL)
      .then(() => {
        onDelete(postID);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(postURL)
      .then((response) => {
        // Пример: предполагаем, что в ответе есть поле "likes" с количеством лайков
        const likes = response.data.likes; // Замените на актуальное поле
        if (likes === "[]") {
          setLikeCount(0);
        } else {
          const likesArray = likes
            .slice(2, -2) // Удаляем квадратные скобки '[' и ']'
            .split("', '"); // Разделяем строку по запятым и одинарным кавычкам
          setLikeCount(likesArray.length);
          setIsLiked(likesArray.includes(userID));
          setLikesArray(likesArray);
        }

        setPostData(response.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postID, postURL, userID]);

  const handleLike = () => {

    try {
      if (isLiked) {
        setIsLiked(false);
        const newArray = likesArray.filter((item) => item !== userID);
        setLikesArray(newArray);
        axios
          .put(postURL + "/update/", {
            content: postData.content,
            author_name: postData.author_name,
            author_id: postData.author_id,
            likes: postData.likes, // Используем newArray здесь
            comments: postData.comments,
          })
          .then((response) => {
            setIsLiked(false); // Устанавливаем isLiked после успешного запроса
            setLikeCount(newArray.length);
          })
          .catch((error) => {
            console.log(error);
          });

      } else {
        setIsLiked(true);
        const newArray = [...likesArray, userID];
        setLikesArray(newArray);

        axios
          .put(postURL + "/update/", {
            content: postData.content,
            author_name: postData.author_name,
            author_id: postData.author_id,
            likes: newArray, // Используем newArray здесь
          })
          .then((response) => {
            setIsLiked(true); // Устанавливаем isLiked после успешного запроса
            setLikeCount(newArray.length);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(usersAPI+`${post.author_id}`).then((data) => {
            setUser(data.data);
        });
    }, []);

  return (
    <div className={styles.post}>
      <div className={styles.wrapper}>
        <div className={styles.post__creator}>
          <img
            className={styles.post__creator__avatar}
            src={`${import.meta.env.VITE_SERVER_URL_MEDIA}${user.avatar}`}
          />
          <p className={styles.post__creator__name}>{user.name}</p>
        </div>
        <p className={styles.post__description}>{post.content}</p>
        {!isComment && <div className={styles.post__actions}>
          <div className={styles.post__action}>
            <img
              className={styles.post__action__img}
              src={isLiked ? likeIconFilled : likeIconUnfilled}
              alt="like-icon"
              onClick={handleLike}
            />
            <p className={styles.post__action__count}>{likeCount}</p>
          </div>
          <div className={styles.post__action}>
            <img
              className={styles.post__action__img}
              src={commentIcon}
              alt="comment-icon"
              onClick={() => navigate(`/post/${post.post_id}/comments`)}
            />
            <p className={styles.post__action__count}>{post.comments.length}</p>
          </div>
        </div>}
        
        {isUserPost && (
          <div className={styles.post__buttons}>
            <button
              className={`${styles.post__button} ${styles.post__edit}`}
              onClick={() => navigate(`/edit-post/${postID}`)}
            >
              Изменить
            </button>
            <button
              className={`${styles.post__button} ${styles.post__delete}`}
              onClick={deletePost}
            >
              Удалить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
