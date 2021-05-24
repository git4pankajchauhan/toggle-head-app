import React from 'react';
import './CustomInput.scss';

const CustomInput = ({ label, className, ...props }) => {
  return (
    <div className="input-wrapper">
      <input className={`input-box ${className}`} {...props} required />
      <label> {label} </label>
    </div>
  );
};

const CustomTextArea = ({ label, className, ...props }) => {
  return (
    <div className="input-wrapper">
      <textarea className={`input-box ${className}`} {...props} required></textarea>
      <label> {label} </label>
    </div>
  );
};

const CustomDropdown = ({ label, label_option = true, className, children, ...props }) => {
  return (
    <div className="input-wrapper">
      <select className={`input-box ${className}`} {...props} required>
        {label_option && <option disabled hidden value=""></option>}
        {children}
      </select>
      <label> {label} </label>
    </div>
  );
};

export { CustomInput, CustomTextArea, CustomDropdown };
