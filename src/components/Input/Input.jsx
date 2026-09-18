import './Input.css';

function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  disabled = false,
  error = '',
}) {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label" htmlFor={name}>
          {label}
        </label>
      )}

      <input
        className="input-field"
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />

      {error && (
        <p className="input-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;