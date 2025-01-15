import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // Importing Chart.js for rendering the chart
import { Chart, registerables } from 'chart.js'; // Import Chart.js and registerables

// Register all necessary components
Chart.register(...registerables);

const PriceTrends = ({ coinId, setPriceTrendsData, timeframe }) => {
    const [priceTrends, setPriceTrends] = useState([]);
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState(null);

    const fetchPriceTrends = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/price_trends?coin_id=${coinId}&timeframe=${timeframe}&predict=false`
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPriceTrends(data.historical_data || []);
            setPredictions(data.predictions || []);
            setPriceTrendsData(data.historical_data || []);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchPriceTrends();
    }, [coinId, timeframe]);

    // Prepare data for the chart
    const chartData = {
        labels: priceTrends.map((entry) => new Date(entry.timestamp).toLocaleDateString()), // Format timestamps for the x-axis
        datasets: [
            {
                label: `Open Price (USD) - ${coinId}`,
                data: priceTrends.map((entry) => entry.open),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
            {
                label: `High Price (USD) - ${coinId}`,
                data: priceTrends.map((entry) => entry.high),
                fill: false,
                borderColor: 'rgba(255,206,86,1)', // Different color for high price
                tension: 0.1,
            },
            {
                label: `Low Price (USD) - ${coinId}`,
                data: priceTrends.map((entry) => entry.low),
                fill: false,
                borderColor: 'rgba(255,99,132,1)', // Different color for low price
                tension: 0.1,
            },
            {
                label: `Close Price (USD) - ${coinId}`,
                data: priceTrends.map((entry) => entry.close),
                fill: false,
                borderColor: 'rgba(54,162,235,1)', // Different color for close price
                tension: 0.1,
            },
            predictions.length > 0 && {
                label: `Predicted Price (USD) - ${coinId}`,
                data: predictions,
                fill: false,
                borderColor: 'rgba(255,99,132,1)',
                borderDash: [5, 5], // Dashed line for predictions
                tension: 0.1,
            },
        ].filter(Boolean), // Filter out null values
    };

    return (
        <div className="chart-container">
            <h2>Price Trends for {coinId}</h2>
            {error && <p className="error">Error: {error}</p>}
            {!error && priceTrends.length > 0 ? (
                <Line data={chartData} />
            ) : (
                <p>Loading data or no data available...</p>
            )}
        </div>
    );
};

export default PriceTrends;