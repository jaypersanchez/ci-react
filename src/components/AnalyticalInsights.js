import React, { useEffect, useState } from 'react';

const AnalyticalInsights = ({ priceTrendsData, volatilityData, supportResistanceData, predictions }) => {
    const [insights, setInsights] = useState('');

    useEffect(() => {
        const generateInsights = async () => {
            const requestData = {
                priceTrends: priceTrendsData,
                predictions: predictions || [],
                volatility: volatilityData,
                support: supportResistanceData.support,
                resistance: supportResistanceData.resistance,
            };
        
            try {
                const url = `${process.env.REACT_APP_API_URL}/api/analytics`;
                console.log(`Posting data to: ${url}`); // Log the URL for debugging
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestData),
                });
                if (!response.ok) {
                    throw new Error(`Network response was not ok. Status: ${response.status}`);
                }
                const data = await response.json();
                setInsights(data.insights || 'No insights available.');
            } catch (error) {
                console.error('Error generating insights:', error); // Log the error
                setInsights('Error generating insights.');
            }
        };
        

        if (priceTrendsData.length > 0 && volatilityData !== null && supportResistanceData.support !== undefined) {
            generateInsights();
        }
    }, [priceTrendsData, volatilityData, supportResistanceData, predictions]);

    return (
        <div>
            <h2>Analytical Insights</h2>
            {insights ? <p>{insights}</p> : <p>Loading insights...</p>}
        </div>
    );
};

export default AnalyticalInsights;
