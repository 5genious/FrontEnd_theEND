import React from 'react'

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="tracking-wider py-1">
        {labelText || name}
      </label>
      <input
        className="rounded-md px-3  py-1 border border-gray-300 bg-slate-100"
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default FormRow
