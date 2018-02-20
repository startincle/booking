import React from 'react';
import Slot from './Slot';

const Card = ({ person, times, handleChange, selected }) => (
  <div className="card">
    <img
      className="card-img-top"
      src={person.image}
      alt={person.name}
    />
    <div className="card-body">
      <a href={person.url} target="_blank">
        <h6 className="card-title">
          {person.name}
        </h6>
      </a>
      <div className="slots">
        {times.map((time, index) => (
        <Slot
          key={time}
          slot={person.slots[index]}
          time={time}
          name={person.name}
          handleChange={handleChange}
          selected={selected}
        />
        ))}
      </div>
    </div>
  </div>
);

export default Card;
