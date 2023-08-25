import { useState, useEffect } from 'react';

const useIsAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = () => {
            const token = localStorage.getItem('userInfo'); // Adjust the storage key if needed
            setIsAuthenticated(!!token); // Convert token presence to boolean
        };

        checkAuthentication();
    }, []);

    return isAuthenticated;
};

export default useIsAuthenticated;