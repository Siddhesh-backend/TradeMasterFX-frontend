import { useEffect, useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { getAllStrategies } from '../../services/api/strategyApi';
import { getAllSymbols } from '../../services/api/historicalDataApi';

const initialFormData = {
    runName: '',
    strategyId: '',
    symbol: '',
    timeframe: '',
    startDate: '',
    endDate: '',
    initialCapital: '',
    riskPercentage: '',
};

function BacktestForm({ onSubmit, loading: submitting = false }) {
    const [formData, setFormData] = useState(initialFormData);

    const [strategies, setStrategies] = useState([]);
    const [symbols, setSymbols] = useState([]);

    const [loadingOptions, setLoadingOptions] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: '',
        }));
    };

    const loadFormData = async () => {
        try {
            setLoadingOptions(true);
            setLoadError('');

            const [strategyData, symbolData] = await Promise.all([
                getAllStrategies(),
                getAllSymbols(),
            ]);

            setStrategies(Array.isArray(strategyData) ? strategyData : []);
            setSymbols(Array.isArray(symbolData) ? symbolData : []);
        } catch (error) {
            setLoadError(
                error.message || 'Unable to load backtest form data.'
            );
        } finally {
            setLoadingOptions(false);
        }
    };

    useEffect(() => {
        loadFormData();
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.runName.trim()) {
            newErrors.runName = 'Run name is required.';
        }

        if (!formData.strategyId) {
            newErrors.strategyId = 'Strategy is required.';
        }

        if (!formData.symbol) {
            newErrors.symbol = 'Symbol is required.';
        }

        if (!formData.timeframe) {
            newErrors.timeframe = 'Timeframe is required.';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required.';
        }

        if (!formData.endDate) {
            newErrors.endDate = 'End date is required.';
        }

        if (
            formData.startDate &&
            formData.endDate &&
            formData.startDate > formData.endDate
        ) {
            newErrors.endDate = 'End date must be on or after start date.';
        }

        if (!formData.initialCapital) {
            newErrors.initialCapital = 'Initial capital is required.';
        } else if (Number(formData.initialCapital) <= 0) {
            newErrors.initialCapital =
                'Initial capital must be greater than zero.';
        }

        if (!formData.riskPercentage) {
            newErrors.riskPercentage = 'Risk percentage is required.';
        } else if (Number(formData.riskPercentage) <= 0) {
            newErrors.riskPercentage =
                'Risk percentage must be greater than zero.';
        } else if (Number(formData.riskPercentage) > 100) {
            newErrors.riskPercentage =
                'Risk percentage cannot exceed 100.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        onSubmit({
            runName: formData.runName.trim(),
            strategyId: Number(formData.strategyId),
            symbol: formData.symbol,
            timeframe: formData.timeframe,
            startDate: formData.startDate,
            endDate: formData.endDate,
            initialCapital: Number(formData.initialCapital),
            riskPercentage: Number(formData.riskPercentage),
        });
    };

    const formDisabled = loadingOptions || submitting;

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Run Name"
                name="runName"
                value={formData.runName}
                onChange={handleChange}
                placeholder="Enter backtest run name"
                disabled={formDisabled}
                error={errors.runName}
            />

            <div>
                <label htmlFor="strategyId">Strategy</label>

                <select
                    id="strategyId"
                    name="strategyId"
                    value={formData.strategyId}
                    onChange={handleChange}
                    disabled={formDisabled}
                >
                    <option value="">Select strategy</option>

                    {strategies.map((strategy) => (
                        <option key={strategy.id} value={strategy.id}>
                            {strategy.strategyName}
                        </option>
                    ))}
                </select>

                {errors.strategyId && <p>{errors.strategyId}</p>}
            </div>

            <div>
                <label htmlFor="symbol">Symbol</label>

                <select
                    id="symbol"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleChange}
                    disabled={formDisabled}
                >
                    <option value="">Select symbol</option>

                    {symbols.map((symbol) => (
                        <option key={symbol} value={symbol}>
                            {symbol}
                        </option>
                    ))}
                </select>

                {errors.symbol && <p>{errors.symbol}</p>}
            </div>

            <div>
                <label htmlFor="timeframe">Timeframe</label>

                <select
                    id="timeframe"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleChange}
                    disabled={formDisabled}
                >
                    <option value="">Select timeframe</option>
                    <option value="M1">M1</option>
                    <option value="M5">M5</option>
                    <option value="M15">M15</option>
                    <option value="M30">M30</option>
                    <option value="H1">H1</option>
                    <option value="H4">H4</option>
                    <option value="D1">D1</option>
                    <option value="W1">W1</option>
                </select>

                {errors.timeframe && <p>{errors.timeframe}</p>}
            </div>

            <Input
                label="Start Date"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                disabled={formDisabled}
                error={errors.startDate}
            />

            <Input
                label="End Date"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                disabled={formDisabled}
                error={errors.endDate}
            />

            <Input
                label="Initial Capital"
                type="number"
                name="initialCapital"
                value={formData.initialCapital}
                onChange={handleChange}
                placeholder="e.g. 10000"
                disabled={formDisabled}
                error={errors.initialCapital}
            />

            <Input
                label="Risk Percentage"
                type="number"
                name="riskPercentage"
                value={formData.riskPercentage}
                onChange={handleChange}
                placeholder="e.g. 2"
                disabled={formDisabled}
                error={errors.riskPercentage}
            />

            {loadError && <p>{loadError}</p>}

            <Button
                type="submit"
                disabled={formDisabled}
            >
                {submitting ? 'Creating...' : 'Create Backtest'}
            </Button>
        </form>
    );
}

export default BacktestForm;