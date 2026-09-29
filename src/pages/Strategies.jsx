import { useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import Loading from '../components/Loading/Loading';
import Alert from '../components/Alert/Alert';
import EmptyState from '../components/EmptyState/EmptyState';
import StrategyCard from '../components/StrategyCard/StrategyCard';
import StrategyForm from '../components/StrategyForm/StrategyForm';
import {
  createStrategy,
  getAllStrategies,
  updateStrategy,
  deleteStrategy,
} from '../services/api/strategyApi';

function Strategies() {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editingStrategy, setEditingStrategy] = useState(null);

  const loadStrategies = async () => {
    try {
      setLoading(true);
      setApiError('');

      const data = await getAllStrategies();

      setStrategies(Array.isArray(data) ? data : []);
    } catch (error) {
      setApiError('Unable to load strategies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStrategies();
  }, []);

  const handleCreate = async (strategyData) => {
    try {
      setCreating(true);
      setApiError('');
      setSuccessMessage('');

      await createStrategy(strategyData);

      setSuccessMessage('Strategy created successfully.');
      await loadStrategies();
    } catch (error) {
      setApiError('Unable to create strategy.');
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (strategyData) => {
    try {
      setCreating(true);
      setApiError('');
      setSuccessMessage('');

      await updateStrategy(editingStrategy.id, strategyData);

      setSuccessMessage('Strategy updated successfully.');
      setEditingStrategy(null);

      await loadStrategies();
    } catch (error) {
      setApiError(
        error.message || 'Unable to update strategy.'
      );
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = (strategy) => {
    setEditingStrategy(strategy);
    setSuccessMessage('');
    setApiError('');
  };

  const handleDelete = async (strategy) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${strategy.strategyName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setApiError('');
      setSuccessMessage('');

      await deleteStrategy(strategy.id);

      setSuccessMessage('Strategy deleted successfully.');
      await loadStrategies();
    } catch (error) {
      setApiError(
        error.message || 'Unable to delete strategy.'
      );
    }
  };
  return (
    <div>
      <h1>Strategies</h1>
      <p>TradeMasterFX Strategy Management</p>

      <div>
        <h2>{editingStrategy ? 'Edit Strategy' : 'Create Strategy'}</h2>

        <Card>
          <StrategyForm
            onSubmit={editingStrategy ? handleUpdate : handleCreate}
            loading={creating}
            initialData={editingStrategy}
            isEditMode={Boolean(editingStrategy)}
          />
        </Card>
      </div>

      {successMessage && (
        <Alert type="success" message={successMessage} />
      )}

      <div>
        <h2>Your Strategies</h2>

        <Card>
          {loading && <Loading />}

          {!loading && apiError && (
            <Alert type="error" message={apiError} />
          )}

          {!loading && !apiError && strategies.length === 0 && (
            <EmptyState message="No strategies available." />
          )}

          {!loading && !apiError && strategies.length > 0 && (
            <div>
              {strategies.map((strategy) => (
                <StrategyCard
                  key={strategy.id}
                  strategy={strategy}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Strategies;