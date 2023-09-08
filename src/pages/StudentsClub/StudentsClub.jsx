import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./StudentsClub.module.sass";
import { useLocation, useNavigate } from "react-router-dom";
import descriptionIcon from "../../assets/description-icon.svg";
import contactIcon from "../../assets/contact-icon.svg";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import axios from "axios";
import { useCurrentUserData } from "../../actions/getCurrentUserData.js";

const studentsClubsAPI = `${import.meta.env.VITE_SERVER_URL}/api/students_clubs/`;

const StudentsClub = () => {
    const [club, setClub] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    //const [isSubscribed, setIsSubscribed] = useState(false);
    const [imageClub, setImageClub] = useState("");
    const [justUpdatedSubscribe, setJustUpdatedSubscribe] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const clubID = location.pathname.split("/").pop();
    const { userID } = useCurrentUserData();

    // useEffect(() => {
    //   axios.get(userAPI, config).then((data) => {
    //     setUserID(data.data.user_id);
    //   });
    // }, []);

    useEffect(() => {
        axios
            .get(studentsClubsAPI + clubID)
            .then((data) => {
                setClub(data.data);
                setImageClub(data.data.image_src);
                //setIsSubscribed(data.data.subscribers.includes(userID));
                setIsLoading(false);
            })
            .catch((error) => {
                // console.log(studentsClubsAPI + projectID)
                console.log(error);
            });
    }, [userID]);

    const src = `${
        import.meta.env.VITE_SERVER_URL
    }/api/students_clubs/${clubID}/delete`;

    const deleteClub = () => {
        axios.delete(src).then(() => {});
        navigate("/profile");
    };

    // const onSubscribe = (clubID) => {
    //     setJustUpdatedSubscribe(true);
    //
    //     const mediaRoot = "/cXQYMmoJTmnj79aRVNDw16rkoGW/media";
    //     const isSubscribedForClub = club.subscribers.includes(userID);
    //     const imageClub = club.image_src.replace(mediaRoot, "");
    //     let updatedSubscribers;
    //
    //     if (isSubscribedForClub) {
    //         updatedSubscribers = club.subscribers.filter((id) => id !== userID); // Удаляем пользователя
    //     } else {
    //         updatedSubscribers = [...club.subscribers, userID]; // Добавляем пользователя
    //     }
    //
    //     const updatedClub = {
    //         ...club,
    //         subscribers: updatedSubscribers,
    //         image_src: imageClub,
    //     };
    //
    //     const src = `${
    //         import.meta.env.VITE_SERVER_URL
    //     }/api/students-clubs/${clubID}/update/`;
    //     axios
    //         .put(src, updatedClub)
    //         .then((response) => {
    //             console.log("Проект успешно обновлен", response.data);
    //             setClub(updatedClub);
    //             setImageClub(imageClub);
    //             setIsSubscribed(!isSubscribedForClub); // Инвертируем состояние подписки
    //             // Обновите состояние проекта в вашем компоненте
    //             // чтобы отразить изменения на интерфейсе
    //         })
    //         .catch((error) => {
    //             console.error("Ошибка при обновлении проекта", error);
    //         });
    // };

    return (
        <>
            <Navbar />
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <div className={styles.header__wrapper}>
                        <div className={styles.project__header}>
                            {isLoading ? (
                                <CardSkeleton cards={1} width={200} />
                            ) : (
                                <>
                                    <img
                                        className={styles.project__logo}
                                        src={

                                                import.meta.env.VITE_SERVER_URL_MEDIA + imageClub
                                        }
                                        alt="Club Logo"
                                    />
                                    <div className={styles.project__info}>
                                        <p className={styles.project__title}>{club.title}</p>
                                        <p className={styles.project__type}>{club.related_by_uni}</p>
                                        {/*<p className={styles.project__type}>*/}
                                        {/*    Подписчики: {club.subscribers.length}*/}
                                        {/*</p>*/}
                                    </div>

                                    <div className={styles.project__control}>
                                        {userID === club.author_id ? (
                                            <>
                                                <button
                                                    className={`${styles.button} ${styles.button__edit}`}
                                                    onClick={() => navigate(`/edit-students-club/${clubID}`)}
                                                >
                                                    Изменить
                                                </button>
                                                <button
                                                    className={`${styles.button} ${styles.button__delete}`}
                                                    onClick={deleteClub}
                                                >
                                                    Удалить
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className={`${styles.button} ${styles.button__subscribe}`}
                                                // onClick={() => onSubscribe(club.club_id)}
                                            >
                                                Вступить
                                                {/*{(!isSubscribed && "Подписаться") || "Отписаться"}*/}
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>



                <section className={styles.description}>
                    <div className={styles.description__wrapper}>
                        <div className={styles.description__header}>
                            <img
                                className={styles.description__img}
                                src={descriptionIcon}
                                alt=""
                            />
                            <h3 className={styles.description__title}>Описание</h3>
                        </div>
                        {isLoading ? (
                            <CardSkeleton cards={1} />
                        ) : (
                            <p className={styles.description__text}>{club.description}</p>
                        )}
                    </div>
                </section>
                <section className={styles.description}>
                    <div className={styles.description__wrapper}>
                        <div className={styles.description__header}>
                            <img
                                className={styles.description__img}
                                src={contactIcon}
                                alt=""
                            />
                            <h3 className={styles.description__title}>Контакты</h3>
                        </div>
                        {isLoading ? (
                            <CardSkeleton cards={1} />
                        ) : (
                            <p className={styles.description__text}>Contact</p>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default StudentsClub;
