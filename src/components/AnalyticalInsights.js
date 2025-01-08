import React, { useEffect, useState } from 'react';

const AnalyticalInsights = ({ priceTrendsData, volatilityData, supportResistanceData }) => {
    const [insights, setInsights] = useState('');

    useEffect(() => {
        const generateInsights = async () => {
            const requestData = {
                priceTrends: priceTrendsData,
                volatility: volatilityData,
                support: supportResistanceData.support,
                resistance: supportResistanceData.resistance,
            };

            // Log the data being sent to the API
            console.log(`Data being sent to ${process.env.REACT_APP_API_URL}/api/analytics:`, requestData);

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/analytics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            setInsights(data.insights);  // Assuming the response contains insights
        };

        if (priceTrendsData.length > 0 && volatilityData !== null && supportResistanceData.support !== undefined) {
            generateInsights();
        }
    }, [priceTrendsData, volatilityData, supportResistanceData]);

    return (
        <div>
            <h2>Analytical Insights</h2>
            {insights ? <p>{insights}</p> : <p>Loading insights...</p>}
        </div>
    );
};

export default AnalyticalInsights;
