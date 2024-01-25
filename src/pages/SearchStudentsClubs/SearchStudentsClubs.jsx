import React, { useState, useEffect } from "react";
import styles from "./SearchStudentsClubs.module.sass";
import Input from "../../components/Input/Input";
import searchIcon from "../../assets/search-icon.svg";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Navbar from "../../components/Navbar/Navbar";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { useNavigate } from "react-router-dom";
import useGetProjects from "../../hooks/useGetProjects";
import useFilter from "../../hooks/useFilter.js";
import StudentsClub from "../StudentsClub/StudentsClub.jsx";
import StudentsClubCard from "../../components/StudentsClubCard/StudentsClubCard.jsx";
import useGetStudentsClubs from "../../hooks/useGetStudentsClubs.js";
import useFilterStudentsClubs from "../../hooks/useFilterStudentsClubs.js";
const SearchStudentsClubs = () => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");
    const [isClubLoading, setIsClubLoading] = useState(true);
    const { clubs } = useGetStudentsClubs(setIsClubLoading);
    const { filteredClubs } = useFilterStudentsClubs(inputText, clubs);

    return (
        <>
            <Navbar />
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <h2 className={styles.header__title}>Студенческие клубы</h2>
                    <Input
                        inputText={inputText}
                        setInputText={setInputText}
                        className={styles.header__input}
                        type="text"
                        placeholder="Поиск..."
                        withIcon={true}
                        imageSrc={searchIcon}
                    />
                </header>
                <section className={styles.projects}>
                    {isClubLoading ? (
                        <CardSkeleton cards={8} />
                    ) : (
                        <>
                            {filteredClubs.map((club) => {
                                return (
                                    <StudentsClubCard
                                        key={club.students_club_id}
                                        club={club}
                                        onClick={() => {
                                            navigate(`/students-club/${club.students_club_id}`);
                                        }}
                                    />
                                );
                            })}
                        </>
                    )}
                </section>
            </div>
        </>
    );
};

export default SearchStudentsClubs;
