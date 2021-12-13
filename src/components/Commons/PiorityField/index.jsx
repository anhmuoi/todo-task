import React from 'react';
import { Controller } from 'react-hook-form';
import './PiorityField.scss';

function PiorityField({ form, name }) {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="pior">
          <span>Prority</span>
          <select {...field}>
            <option value="low">low</option>
            <option value="normal">normal</option>
            <option value="high">high</option>
          </select>
        </div>
      )}
    ></Controller>
  );
}

export default PiorityField;
