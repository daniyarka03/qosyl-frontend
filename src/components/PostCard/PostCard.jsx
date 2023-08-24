import React, {useEffect, useState} from "react";
import styles from "./PostCard.module.sass";
import postCardAvatar from "../../assets/post-card-avatar.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import likeIconUnfilled from "../../assets/like-outline-icon.svg";
import likeIconFilled from "../../assets/like-icon.svg";
import commentIcon from "../../assets/comment-icon.svg";
import {useCurrentUserData} from "../../actions/getCurrentUserData";


const PostCard = ({ isUserPost, authorName, postID, content, onDelete, avatar, id}) => {

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likesArray, setLikesArray] = useState([]); // Массив лайков [строка
  const [postData, setPostData] = useState(null); // Данные поста [объект
  const navigate = useNavigate();
  const deletePostURL = `http://127.0.0.1:8000/api/posts/${postID}/delete/`;
  const postURL = `http://127.0.0.1:8000/api/posts/${id}`;
  const { userID } = useCurrentUserData();

  const deletePost = () => {
    axios
      .delete(deletePostURL)
      .then((response) => {
        onDelete(postID)
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    axios.get(postURL)
        .then(response => {
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
                setLikesArray(likesArray)
            }


            setPostData(response.data)

        })
        .catch(error => {
          console.log(error);
        });
  }, [postID, postURL, userID]);

  const handleLike = () => {
      try {
          if (isLiked) {
              setIsLiked(false);
              const newArray = likesArray.filter(item => item !== userID);
              setLikesArray(newArray);

              axios.put(postURL + "/update/", {
                  content: postData.content,
                  author_name: postData.author_name,
                  author_id: postData.author_id,
                  likes: newArray // Используем newArray здесь
              })
                  .then(response => {
                      setIsLiked(false); // Устанавливаем isLiked после успешного запроса
                      setLikeCount(newArray.length);
                  })
                  .catch(error => {
                      console.log(error);
                  });
          } else {
              setIsLiked(true);
              const newArray = [...likesArray, userID];
              setLikesArray(newArray);

              axios.put(postURL + "/update/", {
                  content: postData.content,
                  author_name: postData.author_name,
                  author_id: postData.author_id,
                  likes: newArray // Используем newArray здесь
              })
                  .then(response => {
                      setIsLiked(true); // Устанавливаем isLiked после успешного запроса
                      setLikeCount(newArray.length);
                  })
                  .catch(error => {
                      console.log(error);
                  });
          }
      } catch (error) {
            console.log(error);
      }

  };


  return (
    <div className={styles.post}>
      <div className={styles.wrapper}>
        <div className={styles.post__creator}>
          <img className={styles.post__creator__avatar} src={`http://127.0.0.1:8000${avatar}`} />
          <p className={styles.post__creator__name}>{authorName}</p>
        </div>
        <p className={styles.post__description}>{content}</p>
        <div className={styles.post__actions}>
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

            />
            <p className={styles.post__action__count}>2</p>
          </div>
        </div>
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
