import React, { useEffect, useState } from 'react'
import styles from "./Jobs.module.sass";
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import useGetJobs from '../../hooks/useGetJobs';
import searchIcon from "../../assets/search-icon.svg";
import JobCard from "../../components/JobCard/JobCard";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import useFilter from '../../hooks/useFilter';

const Jobs = () => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");
    const [isJobLoading, setIsJobLoading] = useState(true);
    const { jobs } = useGetJobs(setIsJobLoading);
    const { filteredJobs } = useFilter(inputText, jobs);
    return (
      <>
        <Navbar />
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h2 className={styles.header__title}>Вакансии</h2>
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
            {isJobLoading ? (
              <CardSkeleton cards={8} />
            ) : (
              <>
                {filteredJobs.map((job) => {
                  return (
                    <JobCard
                      key={job.job_id}
                      job={job}
                      onClick={() => {
                        navigate(`/job/${job.job_id}`);
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
}

export default Jobs