import { useEffect, useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './StrategyForm.css';

const initialFormData = {
    strategyName: '',
    description: '',
    market: '',
    timeframe: '',
    entryRule: '',
    exitRule: '',
    stopLossType: '',
    riskRewardRatio: '',
};

function StrategyForm({
    onSubmit,
    loading = false,
    initialData = null,
    isEditMode = false,
}) {
    const [formData, setFormData] = useState(
        initialData || initialFormData
    );
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(initialFormData);
        }

        setErrors({});
    }, [initialData]);

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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.strategyName.trim()) {
            newErrors.strategyName = 'Strategy name is required.';
        }

        if (!formData.market) {
            newErrors.market = 'Market is required.';
        }

        if (!formData.timeframe) {
            newErrors.timeframe = 'Timeframe is required.';
        }

        if (!formData.entryRule.trim()) {
            newErrors.entryRule = 'Entry rule is required.';
        }

        if (!formData.exitRule.trim()) {
            newErrors.exitRule = 'Exit rule is required.';
        }

        if (!formData.stopLossType) {
            newErrors.stopLossType = 'Stop loss type is required.';
        }

        if (!formData.riskRewardRatio) {
            newErrors.riskRewardRatio =
                'Risk reward ratio is required.';
        } else if (Number(formData.riskRewardRatio) <= 0) {
            newErrors.riskRewardRatio =
                'Risk reward ratio must be greater than zero.';
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
            ...formData,
            riskRewardRatio: Number(formData.riskRewardRatio),
        });
    };

    return (
        <form className="strategy-form" onSubmit={handleSubmit}>
            <Input
                label="Strategy Name"
                name="strategyName"
                value={formData.strategyName}
                onChange={handleChange}
                placeholder="Enter strategy name"
                disabled={loading}
                error={errors.strategyName}
            />

            <Input
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter strategy description"
                disabled={loading}
                error={errors.description}
            />

            <div className="strategy-form-field">
                <label
                    className="strategy-form-label"
                    htmlFor="market"
                >
                    Market
                </label>

                <select
                    className="strategy-form-select"
                    id="market"
                    name="market"
                    value={formData.market}
                    onChange={handleChange}
                    disabled={loading}
                >
                    <option value="">Select market</option>
                    <option value="FOREX">FOREX</option>
                    <option value="STOCKS">STOCKS</option>
                    <option value="CRYPTO">CRYPTO</option>
                    <option value="COMMODITY">COMMODITY</option>
                </select>

                {errors.market && (
                    <p className="strategy-form-error">
                        {errors.market}
                    </p>
                )}
            </div>

            <div className="strategy-form-field">
                <label
                    className="strategy-form-label"
                    htmlFor="timeframe"
                >
                    Timeframe
                </label>

                <select
                    className="strategy-form-select"
                    id="timeframe"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleChange}
                    disabled={loading}
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

                {errors.timeframe && (
                    <p className="strategy-form-error">
                        {errors.timeframe}
                    </p>
                )}
            </div>

            <Input
                label="Entry Rule"
                name="entryRule"
                value={formData.entryRule}
                onChange={handleChange}
                placeholder="Enter entry rule"
                disabled={loading}
                error={errors.entryRule}
            />

            <Input
                label="Exit Rule"
                name="exitRule"
                value={formData.exitRule}
                onChange={handleChange}
                placeholder="Enter exit rule"
                disabled={loading}
                error={errors.exitRule}
            />

            <div className="strategy-form-field">
                <label
                    className="strategy-form-label"
                    htmlFor="stopLossType"
                >
                    Stop Loss Type
                </label>

                <select
                    className="strategy-form-select"
                    id="stopLossType"
                    name="stopLossType"
                    value={formData.stopLossType}
                    onChange={handleChange}
                    disabled={loading}
                >
                    <option value="">Select stop loss type</option>
                    <option value="FIXED">FIXED</option>
                    <option value="ATR">ATR</option>
                    <option value="CANDLE_LOW">CANDLE_LOW</option>
                    <option value="CANDLE_HIGH">CANDLE_HIGH</option>
                </select>

                {errors.stopLossType && (
                    <p className="strategy-form-error">
                        {errors.stopLossType}
                    </p>
                )}
            </div>

            <Input
                label="Risk Reward Ratio"
                type="number"
                name="riskRewardRatio"
                value={formData.riskRewardRatio}
                onChange={handleChange}
                placeholder="e.g. 1.5"
                disabled={loading}
                error={errors.riskRewardRatio}
            />

            <div className="strategy-form-actions">
                <Button type="submit" disabled={loading}>
                    {loading
                        ? isEditMode
                            ? 'Updating...'
                            : 'Saving...'
                        : isEditMode
                            ? 'Update Strategy'
                            : 'Create Strategy'}
                </Button>
            </div>
        </form>
    );
}

export default StrategyForm;