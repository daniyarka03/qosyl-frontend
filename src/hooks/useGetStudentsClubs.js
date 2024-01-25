import { useState, useEffect } from "react";
import axios from "axios";
import { studentsClubsAPI } from "../constants/API";

const useGetStudentsClubs = (setIsClubLoading) => {
    const [clubs, setClubs] = useState([]);
    useEffect(() => {
        axios.get(studentsClubsAPI).then((data) => {
            setClubs(data.data);
            setIsClubLoading(false)
        });
    }, []);
    return { clubs };
};

export default useGetStudentsClubs;
