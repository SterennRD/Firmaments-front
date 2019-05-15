import React, { Component, PropTypes } from 'react';



const renderField = ({ input, label, placeholder, type, meta: { touched, error, invalid, warning }, showMax}) => (
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <label className="control-label storyForm__form_label">{label}</label>
        <div>
            <textarea {...input} className={`form-control ${touched && invalid ? 'is-invalid' : null}`}  placeholder={placeholder} type={type}/>
            <div className="storyForm__form_count">{showMax ? input.value.length + "/" + showMax : null}</div>
            <div className="invalid-feedback">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>
)

export default renderField;