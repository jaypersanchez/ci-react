// src/components/PriceTrends.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js

const PriceTrends = ({ coinId, setPriceTrendsData }) => {
    const [priceTrends, setPriceTrends] = useState([]);
    const [error, setError] = useState(null);

    const fetchPriceTrends = async (coinId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/price_trends?coin_id=${coinId}&predict=true`); // Include predict=true
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPriceTrends(data); // Save the entire response including historical_data and predictions
            setPriceTrendsData(data.historical_data); // Optional: Pass only historical_data to the parent component
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchPriceTrends(coinId);
    }, [coinId]); // Fetch price trends whenever coinId changes

    // Prepare data for the line chart
    const chartData = {
        labels: priceTrends.historical_data?.map(trend => trend.timestamp) || [],
        datasets: [
            {
                label: 'Close Price',
                data: priceTrends.historical_data?.map(trend => trend.close) || [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1,
            },
            {
                label: 'Moving Average',
                data: priceTrends.historical_data?.map(trend => trend.moving_average) || [],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.1,
            },
            {
                label: 'Predicted Price',
                data: priceTrends.predictions || [],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderDash: [5, 5],
                fill: false,
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="chart-container">
        <h2>Price Trends for {coinId}</h2>
        {error && <p className="error">Error: {error}</p>}
        {priceTrends.historical_data?.length > 0 ? (
            <Line
            data={chartData}
            options={{
                responsive: true,
                maintainAspectRatio: true, // Enforce aspect ratio
                aspectRatio: 2,           // 2:1 width-to-height ratio
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12, // Reduce legend font size
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: 'Price Trends and Predictions',
                        font: {
                            size: 16, // Adjust title font size for readability
                        },
                    },
                },
            }}
        />
        
        
        ) : (
            <p>Loading...</p>
        )}
    </div>
    );
};

export default PriceTrends;