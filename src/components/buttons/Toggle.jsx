import './toggle.css';

// eslint-disable-next-line react/prop-types
export const Toggle = ({handleChange, isChecked}) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor="check"></label>
    </div>
  );
};
