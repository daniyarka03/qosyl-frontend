import React, { useEffect, useState } from "react";
import styles from "./CommentCard.module.sass";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import likeIconUnfilled from "../../assets/like-outline-icon.svg";
import likeIconFilled from "../../assets/like-icon.svg";
import commentIcon from "../../assets/comment-icon.svg";
import { useCurrentUserData } from "../../actions/getCurrentUserData";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
const userAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/`;

const CommentCard = ({

                      comment
                  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(userAPI+`${comment.author_id}`).then((data) => {
            setUser(data.data);
            setIsLoading(false)

        });
    }, []);


    return (
        <div className={styles.post}>
            <div className={styles.wrapper}>
                <div className={styles.post__creator}>
                    <img
                        className={styles.post__creator__avatar}
                        src={`${import.meta.env.VITE_SERVER_URL}${user.avatar}`}
                    />
                    <p className={styles.post__creator__name}>{user.name}</p>
                </div>
                <p className={styles.post__description}>{comment.message}</p>



            </div>
        </div>
    );
};

export default CommentCard;
