import './Input.css';

function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  disabled = false,
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
    </div>
  );
}

export default Input;