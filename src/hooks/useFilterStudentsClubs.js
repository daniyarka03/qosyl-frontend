import React, { useEffect, useState } from "react";

const useFilterStudentsClubs = (inputText, studentsClubs) => {
    const [filteredClubs, setFilteredClubs] = useState(studentsClubs);

    useEffect(() => {
        const filtered = studentsClubs.filter((club) => {
            return club.title.toLowerCase().includes(inputText.toLowerCase());
        });
        setFilteredClubs(filtered);
    }, [inputText, studentsClubs]);
    return {
        filteredClubs,
    };
};

export default useFilterStudentsClubs;
