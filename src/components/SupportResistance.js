import React, { useState, useEffect } from 'react';

const SupportResistance = ({ coinId }) => {
    const [supportResistanceData, setSupportResistanceData] = useState({});
    const [error, setError] = useState(null);

    const fetchSupportResistance = async (coinId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/support_resistance?coin_id=${coinId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSupportResistanceData(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchSupportResistance(coinId);
    }, [coinId]); // Fetch support and resistance data whenever coinId changes

    return (
        <div>
            <h2>Support and Resistance for {coinId}</h2>
            {error && <p className="error">Error: {error}</p>}
            {supportResistanceData.support !== undefined && supportResistanceData.resistance !== undefined ? (
                <ul>
                    <li>Support: {supportResistanceData.support.toFixed(2)}</li>
                    <li>Resistance: {supportResistanceData.resistance.toFixed(2)}</li>
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SupportResistance;
