// src/components/PriceTrends.js
import React, { useState, useEffect } from 'react';

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

    return (
        <div>
            <h2>Price Trends for {coinId}</h2>
            {error && <p className="error">Error: {error}</p>}
            <div className="table-container">
                <table className="price-trends-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Close</th>
                            <th>Moving Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        {priceTrends.map((trend, index) => (
                            <tr key={index}>
                                <td>{trend.timestamp}</td>
                                <td>{trend.close}</td>
                                <td>{trend.moving_average}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PriceTrends;