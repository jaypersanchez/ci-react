import React, { useState, useEffect } from 'react';

const AnalyticalInsights = ({ aggregatedData, timeframe }) => {
    const [insights, setInsights] = useState('');
    const [error, setError] = useState(null);

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    const fetchAIInsights = async (data) => {
        //console.log("Data sent to /analyze endpoint:", data); 
        try {
            // Transform priceTrends to include only `open` and `close` values
            const transformedPriceTrends = data.priceTrends.map((entry) => ({
                open: entry.open,
                close: entry.close,
            }));
            const requestBody = {
                priceTrends: transformedPriceTrends,
                volatility: data.volatility,
                supportResistance: {
                    support: data.supportResistance?.support,
                    resistance: data.supportResistance?.resistance,
                },
            };
    
            console.log("Request Body Sent to /analyze:", requestBody); // Debug transformed request body

            const response = await fetch('http://localhost:5001/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('Error fetching AI insights:', errorBody);
                throw new Error('Failed to fetch AI insights');
            }

            const result = await response.json();
            setInsights(result.insights);
        } catch (err) {
            console.error('Error fetching AI insights:', err);
            setError('Unable to fetch AI insights. Please try again later.');
        }
    };

    useEffect(() => {
        if (
            aggregatedData.priceTrends.length &&
            aggregatedData.volatility !== null &&
            aggregatedData.supportResistance.support &&
            aggregatedData.supportResistance.resistance
        ) {
            fetchAIInsights(aggregatedData);
        }
    }, [aggregatedData]);

    return (
        <div>
            <h2>Analytical Insights for {capitalizeFirstLetter(timeframe)} Timeframe</h2>
            {error && <p className="error">{error}</p>}
            <p>{insights || 'Generating insights...'}</p>
        </div>
    );
};

export default AnalyticalInsights;
