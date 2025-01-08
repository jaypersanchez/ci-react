// src/components/PriceTrends.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js

const PriceTrends = ({ coinId }) => {
    const [priceTrends, setPriceTrends] = useState([]);
    const [error, setError] = useState(null);

    const fetchPriceTrends = async (coinId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/price_trends?coin_id=${coinId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPriceTrends(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchPriceTrends(coinId);
    }, [coinId]); // Fetch price trends whenever coinId changes

    // Prepare data for the line chart
    const chartData = {
        labels: priceTrends.map(trend => trend.timestamp), // X-axis labels
        datasets: [
            {
                label: 'Close Price',
                data: priceTrends.map(trend => trend.close), // Y-axis data
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1, // Smooth line
            },
            {
                label: 'Moving Average',
                data: priceTrends.map(trend => trend.moving_average), // Y-axis data for moving average
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.1, // Smooth line
            },
        ],
    };

    return (
        <div>
            <h2>Price Trends for {coinId}</h2>
            {error && <p className="error">Error: {error}</p>}
            {priceTrends.length > 0 ? (
                <Line data={chartData} options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Price Trends',
                        },
                    },
                }} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PriceTrends;