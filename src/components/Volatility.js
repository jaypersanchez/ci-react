import React, { useState, useEffect } from 'react';

const Volatility = ({ coinId, setVolatilityData }) => {
    const [volatility, setVolatility] = useState(null);
    const [error, setError] = useState(null);

    const fetchVolatility = async (coinId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/volatility?coin_id=${coinId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setVolatility(data.volatility);
            setVolatilityData(data.volatility);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchVolatility(coinId);
    }, [coinId]);

    return (
        <div>
            <h2>Volatility for {coinId}</h2>
            {error && <p className="error">Error: {error}</p>}
            {volatility !== null ? (
                <p>The volatility is: {volatility.toFixed(2)}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Volatility;
