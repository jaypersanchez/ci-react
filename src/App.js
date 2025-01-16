import React, { useState } from 'react';
import PriceTrends from './components/PriceTrends';
import Volatility from './components/Volatility';
import PerformanceComparison from './components/PerformanceComparison';
import SupportResistance from './components/SupportResistance';
import AnalyticalInsights from './components/AnalyticalInsights';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [selectedCoinId, setSelectedCoinId] = useState('BTC'); // Default to BTC
    const [selectedCoinIds, setSelectedCoinIds] = useState(['BTC', 'ETH']);
    const [aggregatedData, setAggregatedData] = useState({
        priceTrends: [],
        volatility: null,
        supportResistance: {},
        performanceComparison: [],
    });
    const [timeframe, setTimeframe] = useState('month');

    const handleCoinChange = (coinId) => setSelectedCoinId(coinId);

    const handlePerformanceCoinChange = (coinIds) => setSelectedCoinIds(coinIds);

    const handleTimeframeChange = (timeframe) => setTimeframe(timeframe);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Crypto Insights Dashboard</h1>
            <div className="form-group">
                <label htmlFor="coinSelect">Select Cryptocurrency:</label>
                <select
                    id="coinSelect"
                    className="form-control"
                    value={selectedCoinId}
                    onChange={(e) => handleCoinChange(e.target.value)}
                >
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="XRP">Ripple (XRP)</option>
                    <option value="SOL">Solana (SOL)</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="timeframeSelect">Select Timeframe:</label>
                <select
                    id="timeframeSelect"
                    className="form-control"
                    value={timeframe}
                    onChange={(e) => handleTimeframeChange(e.target.value)}
                >
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                </select>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <PriceTrends
                        coinId={selectedCoinId}
                        setPriceTrendsData={(data) =>
                            setAggregatedData((prev) => ({ ...prev, priceTrends: data }))
                        }
                        timeframe={timeframe}
                    />
                </div>
                <div className="col-md-6">
                    <Volatility
                        coinId={selectedCoinId}
                        setVolatilityData={(data) =>
                            setAggregatedData((prev) => ({ ...prev, volatility: data }))
                        }
                        timeframe={timeframe}
                    />
                </div>
            </div>
            <div className="mt-4">
                <SupportResistance
                    coinId={selectedCoinId}
                    setSupportResistanceData={(data) =>
                        setAggregatedData((prev) => ({ ...prev, supportResistance: data }))
                    }
                    timeframe={timeframe}
                />
            </div>
            <div className="mt-4">
                <PerformanceComparison
                    coinIds={selectedCoinIds}
                    onCoinIdsChange={handlePerformanceCoinChange}
                    setPerformanceComparisonData={(data) =>
                        setAggregatedData((prev) => ({ ...prev, performanceComparison: data }))
                    }
                />
            </div>
            <div className="mt-4">
                <AnalyticalInsights aggregatedData={aggregatedData} timeframe={timeframe} />
            </div>
        </div>
    );
};

export default App;
