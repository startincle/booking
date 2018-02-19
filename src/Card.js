import React from 'react';
import Slot from './Slot';

const serialize = (name) => name.split(' ').reduce((a,b) => `${a}_`.concat(b));

const Card = ({ image, name, title, times, slots, handleChange, selected }) => (
  <div className="card">
    <img
      className="card-img-top"
      src={image}
      alt={name}
    />
    <div className="card-body">
      <h6
        className="card-title"
        data-toggle="tooltip"
        data-html="true"
        data-placement="bottom"
        title={title}
      >
        {name}
      </h6>
      <div className="slots">
        {times.map((time, index) => (
        <Slot
          key={time}
          slot={slots[index]}
          time={time}
          name={serialize(name)}
          handleChange={handleChange}
          selected={selected}
        />
        ))}
      </div>
    </div>
  </div>
);

export default Card;
