import React from 'react';

const Slot = ({ time, slot, name, handleChange, selected }) => (
  <div className={`form-check${slot.trim() ? ' disabled' : ''}`}>
    <input
      className="form-check-input"
      type="radio"
      name={name}
      value={time}
      disabled={!!slot.trim()}
      onChange={handleChange}
      checked={selected.some(value => value.name === name && value.time === time)}
    />
    <label className="form-check-label" htmlFor="slotradios1">
      {time}
    </label>
  </div>
);

export default Slot
