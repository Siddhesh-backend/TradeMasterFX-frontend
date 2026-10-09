import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';
import EmptyState from '../EmptyState/EmptyState';
import Button from '../Button/Button';
import {
    getAllBacktestRuns,
    executeBacktest,
} from '../../services/api/backtestApi';
import './BacktestRunList.css';

function BacktestRunList() {
    const [runs, setRuns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [executingId, setExecutingId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const loadRuns = async () => {
        try {
            setLoading(true);
            setError('');

            const data = await getAllBacktestRuns();

            setRuns(Array.isArray(data) ? data : []);
        } catch (error) {
            setError(
                error.message || 'Unable to load backtest runs.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRuns();
    }, []);

    const handleExecute = async (run) => {
        try {
            setExecutingId(run.id);
            setError('');
            setSuccessMessage('');

            const response = await executeBacktest(run.id);

            setSuccessMessage(
                response?.message || 'Backtest executed successfully.'
            );

            await loadRuns();
        } catch (error) {
            setError(
                error.message || 'Unable to execute backtest.'
            );
        } finally {
            setExecutingId(null);
        }
    };

    const handleViewAnalytics = (runId) => {
        navigate(`/analytics?runId=${runId}`);
    };

    if (loading) {
        return <Loading />;
    }

    if (error && runs.length === 0) {
        return <Alert type="error" message={error} />;
    }

    if (runs.length === 0) {
        return (
            <EmptyState
                title="No backtest runs"
                message="Create a backtest run to see your execution history here."
            />
        );
    }

    return (
        <div className="backtest-run-list">
            {successMessage && (
                <Alert
                    type="success"
                    message={successMessage}
                />
            )}

            {error && (
                <Alert
                    type="error"
                    message={error}
                />
            )}

            {runs.map((run) => (
                <div
                    className="backtest-run-item"
                    key={run.id}
                >
                    <div className="backtest-run-header">
                        <h3>{run.runName}</h3>

                        <span className="backtest-run-status">
                            {run.status}
                        </span>
                    </div>

                    <div className="backtest-run-details">
                        <p>
                            <strong>Strategy:</strong>{' '}
                            {run.strategyName}
                        </p>

                        <p>
                            <strong>Symbol:</strong>{' '}
                            {run.symbol}
                        </p>

                        <p>
                            <strong>Timeframe:</strong>{' '}
                            {run.timeframe}
                        </p>

                        <p>
                            <strong>Initial Capital:</strong>{' '}
                            {run.initialCapital}
                        </p>

                        <p>
                            <strong>Risk:</strong>{' '}
                            {run.riskPercentage}%
                        </p>

                        <p>
                            <strong>Total Trades:</strong>{' '}
                            {run.totalTrades}
                        </p>

                        <p>
                            <strong>Total Profit/Loss:</strong>{' '}
                            {run.totalProfitLoss}
                        </p>
                    </div>

                    <div className="backtest-run-actions">
                        {run.status === 'CREATED' && (
                            <Button
                                type="button"
                                onClick={() => handleExecute(run)}
                                disabled={executingId !== null}
                            >
                                {executingId === run.id
                                    ? 'Executing...'
                                    : 'Execute Backtest'}
                            </Button>
                        )}

                        {run.status === 'COMPLETED' && (
                            <Button
                                type="button"
                                onClick={() => handleViewAnalytics(run.id)}
                            >
                                View Analytics
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BacktestRunList;