import React, { Component, PropTypes } from 'react';



const renderField = ({ input, label, placeholder, type, meta: { touched, error, invalid, warning }, showMax}) => (
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <label className="control-label">{label}</label>
        <div>
            <textarea {...input} className={`form-control ${touched && invalid ? 'is-invalid' : null}`}  placeholder={placeholder} type={type}/>
            {showMax ? input.value.length + "/" + showMax : null}
            <div className="invalid-feedback">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>
)

export default renderField;