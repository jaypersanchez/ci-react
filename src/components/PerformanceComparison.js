import React, { useState, useEffect } from 'react';

const PerformanceComparison = ({ coinIds, onCoinIdsChange }) => {
    const [performanceData, setPerformanceData] = useState([]);
    const [error, setError] = useState(null);

    const fetchPerformanceComparison = async (coinIds) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/performance_comparison?coin_ids=${coinIds.join('&coin_ids=')}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPerformanceData(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchPerformanceComparison(coinIds);
    }, [coinIds]); // Fetch performance data whenever coinIds change

    return (
        <div>
            <h2>Performance Comparison</h2>
            {error && <p className="error">Error: {error}</p>}
            <div className="form-group">
                <label htmlFor="performanceCoinSelect">Select Coins to Compare:</label>
                <select
                    id="performanceCoinSelect"
                    className="form-control" // Apply Bootstrap class for styling
                    multiple
                    value={coinIds}
                    onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                        onCoinIdsChange(selectedOptions);
                    }}
                >
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="XRP">Ripple (XRP)</option>
                    <option value="SOL">Solana (SOL)</option>
                </select>
            </div>
            <ul>
                {performanceData.map(({ coin_id, performance_percentage }) => (
                    <li key={coin_id}>
                        {coin_id}: {performance_percentage.toFixed(2)}% {/* Display performance rounded to 2 decimal places */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PerformanceComparison;