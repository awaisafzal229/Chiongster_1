'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Page = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('accessToken');

                if (!token) {
                    setError(true);
                    return;
                }

                const response = await fetch('https://chat.innov8sion.com/api/test', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Invalid request');

                const result = await response.json();
                setData(result);
                console.log(result)
            } catch (error) {
                setError(true);
            }
        };

        fetchData();
    }, []);

    if (error) return <div>Failed to fetch data.</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>Data from API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Page;
