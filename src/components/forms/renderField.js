import React, { Component, PropTypes } from 'react';


const renderField = ({ input, label, type, meta: { touched, error, invalid, warning } }) => (
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <label className="control-label storyForm__form_label">{label}</label>
        <div>
            <input {...input} className={`form-control ${touched && invalid ? 'is-invalid' : ''}`} placeholder={label} type={type}/>
            <div className="invalid-feedback">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>
)

export default renderField;