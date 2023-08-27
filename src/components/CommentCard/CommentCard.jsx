import React, { useEffect, useState } from "react";
import styles from "./CommentCard.module.sass";
import axios from "axios";
import 'react-loading-skeleton/dist/skeleton.css'
import CardSkeleton from "../CardSkeleton/CardSkeleton.jsx";
const userAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/`;

const CommentCard = ({comment}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(userAPI+`${comment.author_id}`).then((data) => {
            setUser(data.data);
            setIsLoading(false)
        });
    }, []);


    return (

        <div className={styles.post}>
            {isLoading && <CardSkeleton cards={2}/>}
            <div className={styles.wrapper}>
                <div className={styles.post__creator}>
                    <img
                        className={styles.post__creator__avatar}
                        src={`${import.meta.env.VITE_SERVER_URL_MEDIA}${user.avatar}`}
                    />
                    <p className={styles.post__creator__name}>{user.name}</p>
                </div>
                <p className={styles.post__description}>{comment.message}</p>
            </div>
        </div>
    );
};

export default CommentCard;
