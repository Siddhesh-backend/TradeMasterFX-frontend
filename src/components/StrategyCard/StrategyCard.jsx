import Card from '../Card/Card';
import Button from '../Button/Button';
import './StrategyCard.css';

function StrategyCard({ strategy, onEdit, onDelete }) {
    return (
        <Card>
            <div className="strategy-card">
                <div className="strategy-card-header">
                    <h2>{strategy.strategyName}</h2>

                    {strategy.description && (
                        <p className="strategy-card-description">
                            {strategy.description}
                        </p>
                    )}
                </div>

                <div className="strategy-card-details">
                    <p>
                        <strong>Market:</strong> {strategy.market}
                    </p>

                    <p>
                        <strong>Timeframe:</strong> {strategy.timeframe}
                    </p>

                    <p>
                        <strong>Stop Loss:</strong> {strategy.stopLossType}
                    </p>

                    <p>
                        <strong>Risk Reward:</strong>{' '}
                        {strategy.riskRewardRatio}
                    </p>
                </div>

                <div className="strategy-card-actions">
                    <Button
                        type="button"
                        onClick={() => onEdit(strategy)}
                    >
                        Edit
                    </Button>

                    <Button
                        type="button"
                        onClick={() => onDelete(strategy)}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default StrategyCard;