import React, { useState, useEffect } from 'react';
const SupportResistance = ({ coinId, setSupportResistanceData, timeframe }) => {
    const [supportResistanceData, setSupportResistanceDataLocal] = useState({});
    const [error, setError] = useState(null);

    const fetchSupportResistance = async (coinId, timeframe) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/support_resistance?coin_id=${coinId}&timeframe=${timeframe}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSupportResistanceDataLocal(data);
            setSupportResistanceData(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchSupportResistance(coinId, timeframe);
    }, [coinId, timeframe]);

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