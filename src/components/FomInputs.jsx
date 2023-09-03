import React from 'react';

export const FomInputs = (props) => {
  const { value, onChange, erros, ...input } = props;
  return (
    <>
      <div className="my-3 fw-medium">
        <label htmlFor="" className="form-label">
          {input?.label}
        </label>
        <input
          type={input?.type}
          placeholder={input?.placeholder}
          name={input?.name}
          autoComplete="off"
          className={input?.className}
          onChange={onChange}
          value={value}
        />
        {erros && <p className="text-danger mt-2">{erros[input?.name]}</p>}
      </div>
    </>
  );
};

export const SelectInput = ({ data, onchange }) => {
  return (
    <>
      <select className="form-select" aria-label="Default select example">
        <option>Choose Category</option>
        {data.map((item, i) => (
          <option
            key={i}
            value={item?.title}
            onChange={() => onchange(item?.title)}
          >
            {item?.title}
          </option>
        ))}
      </select>
    </>
  );
};
