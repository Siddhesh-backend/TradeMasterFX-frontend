import { apiClient } from './apiClient';

export const uploadHistoricalData = ({
    symbol,
    market,
    timeframe,
    file,
}) => {
    const formData = new FormData();

    formData.append('symbol', symbol);

    if (market) {
        formData.append('market', market);
    }

    if (timeframe) {
        formData.append('timeframe', timeframe);
    }

    formData.append('file', file);

    return apiClient('/api/v1/market-data/upload', {
        method: 'POST',
        body: formData,
    });
};

export const getAllSymbols = () => {
    return apiClient('/api/v1/market-data/symbols', {
        method: 'GET',
    });
};

export const getMarketDataBySymbol = (symbol) => {
    return apiClient(
        `/api/v1/market-data/${encodeURIComponent(symbol)}`,
        {
            method: 'GET',
        }
    );
};