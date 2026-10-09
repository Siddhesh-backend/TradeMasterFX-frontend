import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import './EquityCurve.css';

function EquityCurve({ data = [] }) {
    if (!data.length) {
        return (
            <div className="equity-curve-empty">
                <p>No equity curve data available.</p>
            </div>
        );
    }

    const chartData = data.map((point) => ({
        tradeNumber: point.tradeNumber,
        equity: Number(point.equity),
    }));

    return (
        <div className="equity-curve">
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="tradeNumber"
                        label={{
                            value: 'Trade Number',
                            position: 'insideBottom',
                            offset: -5,
                        }}
                    />

                    <YAxis
                        label={{
                            value: 'Equity',
                            angle: -90,
                            position: 'insideLeft',
                        }}
                    />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="equity"
                        stroke="currentColor"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default EquityCurve;