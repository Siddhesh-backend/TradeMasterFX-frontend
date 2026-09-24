import Card from '../Card/Card';
import './MetricCard.css';

function MetricCard({ title, value }) {
    return (
        <Card>
            <h2>{title}</h2>
            <p className="metric-value">{value}</p>
        </Card>
    );
}

export default MetricCard;