import './EmptyState.css';

function EmptyState({ message = 'No data available.' }) {
  return (
    <div className="empty-state" role="status">
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;