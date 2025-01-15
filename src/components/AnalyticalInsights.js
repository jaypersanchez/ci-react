import React from 'react';

const AnalyticalInsights = ({ priceTrendsData, volatilityData, supportResistanceData, timeframe }) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const generateInsights = () => {
        if (!priceTrendsData.length || volatilityData === null || !supportResistanceData.support || !supportResistanceData.resistance) {
            return "Insufficient data to generate insights.";
        }

        const latestPrice = priceTrendsData[priceTrendsData.length - 1].close; // Get the latest closing price
        const support = supportResistanceData.support;
        const resistance = supportResistanceData.resistance;

        let insights = [];

        // Analyze volatility
        if (volatilityData < 0.05) {
            insights.push("The market is currently stable with low volatility.");
        } else if (volatilityData < 0.15) {
            insights.push("The market is moderately volatile. Caution is advised.");
        } else {
            insights.push("The market is highly volatile. Consider risk management strategies.");
        }

        // Compare latest price with support and resistance
        if (latestPrice < support) {
            insights.push("The price is below the support level, indicating a bearish trend.");
        } else if (latestPrice > resistance) {
            insights.push("The price is above the resistance level, indicating a bullish trend.");
        } else {
            insights.push("The price is within the support and resistance levels, indicating a consolidation phase.");
        }

        return insights.join(" ");
    };

    return (
        <div>
            <h2>Analytical Insights for {capitalizeFirstLetter(timeframe)} Timeframe</h2>
            <p>{generateInsights()}</p>
        </div>
    );
};

export default AnalyticalInsights;
