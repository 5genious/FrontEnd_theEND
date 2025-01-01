import React from 'react'

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <>
      <span className="p-float-label ">
        <label htmlFor={name}>{labelText || name}</label>
        <input
          className="p-1 lg:p-3 w-full rounded-lg"
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </span>
    </>
  )
}

export default FormRow
