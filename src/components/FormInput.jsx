import React from 'react'

function FormInput({label, type, name}) {
  return (
    <div>
 <label className="form-control w-full mb-3">
  <div className="label">
    <span className="label-text">{label}</span>
  </div>
  <input type={type} required name={name} placeholder="Type here" className="input input-bordered w-full" />
</label>
    </div>
  )
}

export default FormInput