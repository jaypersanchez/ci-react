import React, { useState, useEffect } from 'react';

const PerformanceComparison = ({ coinIds, onCoinIdsChange }) => {
    const [performanceData, setPerformanceData] = useState([]);
    const [error, setError] = useState(null);
    const [insights, setInsights] = useState('');

    const fetchPerformanceComparison = async (coinIds) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/performance_comparison?coin_ids=${coinIds.join('&coin_ids=')}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPerformanceData(data);
            generateInsights(data); // Generate insights based on the fetched data
        } catch (error) {
            setError(error.message);
        }
    };

    const generateInsights = (data) => {
        if (data.length < 2) return; // Ensure there are at least two coins to compare

        let insights = `Performance Comparison: \n`;
        data.forEach(coin => {
            insights += `- ${coin.coin_id} has experienced a change of ${coin.performance_percentage.toFixed(2)}%. \n`;
        });

        // Determine which coin performed better
        const bestPerformingCoin = data.reduce((prev, current) => {
            return (prev.performance_percentage > current.performance_percentage) ? prev : current;
        });

        const worstPerformingCoin = data.reduce((prev, current) => {
            return (prev.performance_percentage < current.performance_percentage) ? prev : current;
        });

        insights += `\nThis indicates that ${bestPerformingCoin.coin_id} has outperformed ${worstPerformingCoin.coin_id} over the specified timeframe.`;

        setInsights(insights);
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
            {insights && (
                <div className="insights">
                    <h3>Perofrmance Comparison Insights:</h3>
                    <p>{insights}</p>
                </div>
            )}
        </div>
    );
};

export default PerformanceComparison;