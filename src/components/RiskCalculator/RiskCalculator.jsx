import { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Alert from '../Alert/Alert';
import { calculateRisk } from '../../services/api/riskApi';
import './RiskCalculator.css';

const initialFormData = {
    accountBalance: '',
    riskPercentage: '',
    entryPrice: '',
    stopLossPrice: '',
};

function RiskCalculator() {
    const [formData, setFormData] = useState(initialFormData);
    const [result, setResult] = useState(null);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);

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

        setApiError('');
        setResult(null);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.accountBalance) {
            newErrors.accountBalance = 'Account balance is required.';
        } else if (Number(formData.accountBalance) <= 0) {
            newErrors.accountBalance = 'Account balance must be greater than zero.';
        }

        if (!formData.riskPercentage) {
            newErrors.riskPercentage = 'Risk percentage is required.';
        } else if (Number(formData.riskPercentage) <= 0) {
            newErrors.riskPercentage = 'Risk percentage must be greater than zero.';
        } else if (Number(formData.riskPercentage) > 100) {
            newErrors.riskPercentage = 'Risk percentage cannot exceed 100.';
        }

        if (!formData.entryPrice) {
            newErrors.entryPrice = 'Entry price is required.';
        } else if (Number(formData.entryPrice) <= 0) {
            newErrors.entryPrice = 'Entry price must be greater than zero.';
        }

        if (!formData.stopLossPrice) {
            newErrors.stopLossPrice = 'Stop loss price is required.';
        } else if (Number(formData.stopLossPrice) <= 0) {
            newErrors.stopLossPrice = 'Stop loss price must be greater than zero.';
        }

        if (
            formData.entryPrice &&
            formData.stopLossPrice &&
            Number(formData.entryPrice) === Number(formData.stopLossPrice)
        ) {
            newErrors.stopLossPrice = 'Stop loss price must differ from entry price.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setApiError('');
        setResult(null);

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const response = await calculateRisk({
                accountBalance: Number(formData.accountBalance),
                riskPercentage: Number(formData.riskPercentage),
                entryPrice: Number(formData.entryPrice),
                stopLossPrice: Number(formData.stopLossPrice),
            });

            setResult(response);
        } catch (error) {
            setApiError(error.message || 'Unable to calculate risk.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="risk-calculator">
            <form
                className="risk-calculator-form"
                onSubmit={handleSubmit}
            >
                <Input
                    label="Account Balance"
                    type="number"
                    name="accountBalance"
                    value={formData.accountBalance}
                    onChange={handleChange}
                    placeholder="e.g. 10000"
                    disabled={loading}
                    error={errors.accountBalance}
                />

                <Input
                    label="Risk Percentage"
                    type="number"
                    name="riskPercentage"
                    value={formData.riskPercentage}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    disabled={loading}
                    error={errors.riskPercentage}
                />

                <Input
                    label="Entry Price"
                    type="number"
                    name="entryPrice"
                    value={formData.entryPrice}
                    onChange={handleChange}
                    placeholder="e.g. 2650"
                    disabled={loading}
                    error={errors.entryPrice}
                />

                <Input
                    label="Stop Loss Price"
                    type="number"
                    name="stopLossPrice"
                    value={formData.stopLossPrice}
                    onChange={handleChange}
                    placeholder="e.g. 2640"
                    disabled={loading}
                    error={errors.stopLossPrice}
                />

                {apiError && (
                    <Alert type="error" message={apiError} />
                )}

                <div className="risk-calculator-action">
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Calculating...' : 'Calculate Risk'}
                    </Button>
                </div>
            </form>

            {result && (
                <div className="risk-calculator-result">
                    <div className="risk-result-item">
                        <p className="risk-result-label">
                            Risk Amount
                        </p>
                        <p className="risk-result-value">
                            {result.riskAmount}
                        </p>
                    </div>

                    <div className="risk-result-item">
                        <p className="risk-result-label">
                            Stop Loss Distance
                        </p>
                        <p className="risk-result-value">
                            {result.stopLossDistance}
                        </p>
                    </div>

                    <div className="risk-result-item">
                        <p className="risk-result-label">
                            Position Size
                        </p>
                        <p className="risk-result-value">
                            {result.quantity}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RiskCalculator;